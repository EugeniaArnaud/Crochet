document.querySelectorAll('.row img').forEach(image => {
    image.onclick = () => {
        document.querySelector('.popup').style.display = 'block';
        document.querySelector('.popup img').src = image.getAttribute('src')
        
    }

});
document.querySelector('.popup span').onclick = () =>{
    document.querySelector('.popup').style.display = 'none';

}

//popup

//  const popup = document.querySelector('.popup');
//  const closeBtn = document.querySelector('.close-btn');
// const imageName = document.querySelector('.image-name');
// const largeImage = document.querySelector('.large-image');
// const imageIndex = document.querySelector('.index');
// const leftArrow = document.querySelector('.left-arrow');
// const rightArrow = document.querySelector('.right-arrow');

// let index = 0 //will track our current image;

// images.forEach((item, i) => {
//      item.addEventListener('click', () => {
//          updateImage(i);
//          popup.classList.toggle('active');
//      })
//  })

// const updateImage = (i) => {
//     let path = `images/img${i+1}.jpg`
//     largeImage.src = path;
//     imageName.innerHTML = path;
//     imageIndex.innerHTML = `0${i+1}`;
//     index = i;
// }

//   closeBtn.addEventListener('click', () =>{
//       popup.classList.toggle('active')
//   })
