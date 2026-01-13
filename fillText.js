/*
This Code controls;
-Editing (enable/lock)
-Auto-saving to localstorage
-clearing all data 
-Downloading as pdf
*/

document.addEventListener("DOMContentLoaded",function (){

    /*=====================
      GET ELEMENT FROM HTML
    =======================*/

    const editBtn =
document.getElementById("editBtn")
    const cleartBtn =
document.getElementById("clearBtn")
    const downloadBtn =
document.getElementById("downloadBtn")
    const cells =
document.querySelectorAll(".cell")

     /*===============
       STATE VARIABLE
       ===============*/
       // Tracks whether editing is on or off

    let editingEnabled = false;

    /* =================
       LOAD SAVED DATA
       ================= */
    let savedData =
localStorage.getItem("timetableData");
 
// if data exist convert from JSON
    if (savedData !==null){
        savedData = JSON.parse(savedData);
    }
    else{
        savedData = [];
    }

    // put saved values into each cell
    cells.forEach(function(cell, index){
        if (savedData[index]!== undefined) {
            cell.value = savedData[index];
        }
        else {
            cell.value = "";
        }

        // lock cells by default
        cell.disabled= true;

        // auto save whenever user types
        cell.addEventListener("input", function (){
            if (!cell.disabled){
                saveTimetable();
                updateCellColors(); // Update colors when data changes
            }
        });
    });


    /*=====================
      ENABLE/LOCK EDITING 
      ==================== */

    editBtn.addEventListener("click", function(){

        //toggle editing state 
        editingEnabled = !editingEnabled

        // enable or disable all cells 
        cells.forEach(function(cell){
            cell.disabled = !editingEnabled;
        });
        // chANGE Button text
        if (editingEnabled){
            editBtn.textContent ="lock editing";
        }
        else {
            saveTimetable();
            editBtn.textContent = "enabled editing";
        }
    });

    /* ==========================
      CLEAR ALL DATA
      ========================= */

    cleartBtn.addEventListener("click", function(){
        const confirmClear= confirm("This will delete all timetable data.\nAre you sure?");
        if (!confirmClear) {
            return;
        }
        // clear localstorAGE
        localStorage.removeItem("timetableData");

        // clear all cells
        cells.forEach(function(cell){
            cell.value="";
        });

    });


    /* ==========================
        DOWNLOAD AS PDF
        ========================= */
    downloadBtn.addEventListener("click", function(){

        // LOCK EDITING IF ENABLED
        editingEnabled = false;
        cells.forEach(function(cell){
            cell.disabled = true;
            editBtn.textContent = "enable editing";
        });
        // GIVE BROWSER TIME TO ApPLY CHANGES
        setTimeout(function(){
            window.print();
        }, 300);
    });

    // SAVE TIMETABLE FUNCTION
    function saveTimetable(){
        let dataToSave = [];
        cells.forEach(function(cell){
            dataToSave.push (cell.value);
        });

        localStorage.setItem(
            "timetableData",
            JSON.stringify(dataToSave)
        );
    }

    // Create a new jsPDF instance
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

});