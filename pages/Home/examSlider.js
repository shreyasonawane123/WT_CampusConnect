// Add scroll functionality to the arrows
document.getElementById('scroll-left').addEventListener('click', function() {
    document.querySelector('.exams-wrapper').scrollBy({
        left: -300, // Adjust this value as needed
        behavior: 'smooth'
    });
});

document.getElementById('scroll-right').addEventListener('click', function() {
    document.querySelector('.exams-wrapper').scrollBy({
        left: 300, // Adjust this value as needed
        behavior: 'smooth'
    });
});
