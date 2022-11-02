// import birdsData from "./data/_birdsData_en"

// main__wrapper
// header__nav

// active


// window.onload = function() {



// }


// main-section_hide

// const mainWrapper = document.querySelector(".main__wrapper")
// console.log(mainWrapper)


// console.log("Array.from(mainWrapper.children)",Array.from(mainWrapper.children))
// console.log("Array.from(mainWrapper.children).indexOf(numberli)",Array.from(mainWrapper.children).indexOf(numberli))


const addTagsClickHandler = () => {
    const headerNav = document.querySelector('.header__nav');
    const mainWrapper = document.querySelector(".main__wrapper")
    const mainWrapperChildern = Array.from(mainWrapper.children);
    headerNav.addEventListener('click', (e) => {
        if (e.target.classList.contains('nav__item')) {

            let clickedTag = e.target;
            removeSelectedTags();
            selectClickedTag(clickedTag);


            const numberli = e.target.closest(".nav__item");
            // console.log(numberli)
            const index = Array.from(headerNav.children).indexOf(numberli);
            // console.log(index)


            removeSection(mainWrapperChildern)
            addSection(mainWrapperChildern[index])



        }
    })
}

    addTagsClickHandler();

const removeSelectedTags = () => {
    let tags = document.querySelectorAll('.nav__item');
    tags.forEach(tag => {
        tag.classList.remove('active');
    })
}

const selectClickedTag = (clickedTag) => {
    clickedTag.classList.add('active');
}

const removeSection = (arrayChildren) => {
    arrayChildren.forEach(child => {
        child.classList.add('main-section_hide');
    })
}

const addSection = (child) => {
    child.classList.remove('main-section_hide');
}