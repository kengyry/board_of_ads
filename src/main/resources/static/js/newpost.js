let displayLayer = 1;

$(document).ready(function () {
    getParentCategories().then();
})

async function getParentCategories() {

    let categories = await getCategories('/api/category/allParentCategory');

    for (let i = 0; i < categories.length; i++) {
        let category = categories[i];
        document.getElementById('cascadeTableColumn1').innerHTML +=
            `<div class="category-table-button inactive-category-table-button" 
                    id="categoryTableButton${category.id}" 
                    onclick="clickOnCategoryButton(this, ${category.id})" onmouseover="hoverOnCategoryButton()">
                ${category.name}
            </div>`
    }
    return true;
}

async function clickOnCategoryButton(object, parentID) {
    $(".category-table-button")
        .removeClass("active-category-table-button")
        .addClass("inactive-category-table-button").css("background-color", "#fff");
    $(object).removeClass("inactive-category-table-button")
        .addClass("active-category-table-button").css("background-color", "#0af", "color", "#fff");
    $("#cascade-table-3").css("display", "none");
    return await getChildCategory(parentID);
}

async function getChildCategory(parentID) {

    let categories = await getCategories('/api/category/allChildCategories/' + parentID);

    if (categories.length !== 0) {
        let parent = await getCategories('/api/category/' + parentID);

        if (parent.layer < displayLayer) {
            for (let i = parent.layer + 1; i <= displayLayer; i++) {
                document.getElementById('cascadeTableColumn' + i).remove();
            }
            displayLayer = parent.layer;
        }
        document.getElementById('cascadeTableContainer').innerHTML +=
            '<div id="cascadeTableColumn' + categories[0].layer + '" class="cascade-table-column">' +
            '   <div class="category-table-title">'+parent.name+'</div>' +
            '</div>';

        for (let i = 0; i < categories.length; i++) {
            let category = categories[i];
            let id = 'cascadeTableElement_' + (category.frontName === null ? category.id : category.frontName);
            document.getElementById('cascadeTableColumn' + category.layer).innerHTML +=
                `<div class="category-table-button inactive-category-table-button" 
                        id="${id}" onclick="clickOnCategoryButton(this, ${category.id})" 
                        onmouseover="hoverOnCategoryButton()">
                ${category.name}
            </div>`
        }
        displayLayer++;
        return true;
    }
    return false;
}

async function getCategories(url) {
    let response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    return (await response.json()).data;
}

function hoverOnCategoryButton() {
    $(".category-table-button").hover(
        function () {
            if (!this.classList.contains("active-category-table-button")) {
                $(this).css("background-color", "#a5eaf8");
            }
        }, function () {
            if (!this.classList.contains("active-category-table-button")) {
                $(this).css("background-color", "#fff");
            }
        });
}

$('#pathCategoryButton').on('click', function () {
    $('#pathCategory').hide();
    $('#visibleElement1').show();
});





async function getCategoryTable() {
    let categories = await getCategories();
    for (let i = 0; i < categories.length; i++) {
        let x = categories[i];
        if (x.layer === 1) {
            document.getElementById("cascade-table").innerHTML +=
                `<div class="category-table-button inactive-category-table-button" id="category-table-button" 
                            onclick="clickOnCategoryButton(this,'${x.name}')" onmouseover="hoverOnCategoryButton()">
                        ${x.name}
                    </div>`
        }
    }
}

async function getCategoryTable2(categoryName) {
    let categories = await getCategories();
    $("#cascade-table-2").css("display", "block");
    document.getElementById("cascade-table-2").innerHTML =
        `<div class="category-table-title">
                    ${categoryName}
                 </div>`;
    for (let i = 0; i < categories.length; i++) {
        let x = categories[i];
        if (x.parentName === categoryName) {
            let simpleName = x.name.substring(x.parentName.length + 1);
            document.getElementById("cascade-table-2").innerHTML +=
                `<div class="category-table-button-2 unactive-category-table-button-2" id="category-table-button-2" 
                            onclick="clickOnCategoryButton2(this, '${x.name}', '${simpleName}')" onmouseover="hoverOnCategoryButton2()">
                        ${simpleName}
                    </div>`
        }
    }
}

async function getCategoryTable3(categoryName, simpleName) {
    let categories = await getCategories();
    $("#cascade-table-3").css("display", "block");
    document.getElementById("cascade-table-3").innerHTML =
        `<div class="category-table-title">
                    ${simpleName}
                 </div>`;
    for (let i = 0; i < categories.length; i++) {
        let x = categories[i];
        if (x.parentName === categoryName) {
            let simpleName = x.name.substring(x.parentName.length + 1);
            document.getElementById("cascade-table-3").innerHTML +=
                `<div class="category-table-button-3 inactive-category-table-button-3" id="category-table-button-3"                       
                            onclick="clickOnCategoryButton3()" onmouseover="hoverOnCategoryButton3()">
                        ${simpleName}
                    </div>`
        }
    }
}

function clickOnCategoryButton2(o, category, simpleName) {
    $(".category-table-button-2").removeClass("active-category-table-button-2")
        .addClass("inactive-category-table-button-2").css("background-color", "#fff");
    $(o).removeClass("inactive-category-table-button-2")
        .addClass("active-category-table-button-2").css("background-color", "#0af", "color", "#fff");
    getCategoryTable3(category, simpleName)
}

function clickOnCategoryButton3() {
    $('#pathCategory').show();
    $('#visibleElement1').show();
    $('#visibleElement2').show();
    $('#visibleElement3').show();
    /*$(".category-table-button-3").removeClass("active-category-table-button-3")
        .addClass("inactive-category-table-button-3").css("background-color", "#fff");
    $(o).removeClass("inactive-category-table-button-3")
        .addClass("active-category-table-button-3").css("background-color", "#0af", "color", "#fff");
    // todo add action*/
}

function hoverOnCategoryButton2() {
    $(".category-table-button-2").hover(
        function () {
            if (!this.classList.contains("active-category-table-button-2")) {
                $(this).css("background-color", "#a5eaf8");
            }
        }, function () {
            if (!this.classList.contains("active-category-table-button-2")) {
                $(this).css("background-color", "#fff");
            }
        });
}

function hoverOnCategoryButton3() {
    $(".category-table-button-3").hover(
        function () {
            if (!this.classList.contains("active-category-table-button-3")) {
                $(this).css("background-color", "#a5eaf8");
            }
        }, function () {
            if (!this.classList.contains("active-category-table-button-3")) {
                $(this).css("background-color", "#fff");
            }
        });
}