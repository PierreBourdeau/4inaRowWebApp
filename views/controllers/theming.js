var theme = 'light';
const root = document.documentElement;
document.getElementById('switch-1').addEventListener('change', function () {
    switchTheme();
});

function switchTheme() {
    if (theme === 'light') {
        root.style.setProperty('--font-color', '#9baacf');
        root.style.setProperty('--bg-color', ' #e4ebf5');
        root.style.setProperty('--box-shadow', '.8rem .8rem 1.4rem #c8d0e7, -.2rem -.2rem 1.8rem #fff');
        root.style.setProperty('--inner-shadow', 'inset .2rem .2rem .5rem #c8d0e7, inset -.2rem -.2rem .5rem #fff');
        root.style.setProperty('--inner-shadow-dark', '10px 10px 59px -23px rgba(0,0,0,0.75) inset');
        root.style.setProperty('--e-shadow', '.3rem .3rem .6rem #c8d0e7, -.2rem -.2rem .5rem #fff');
        root.style.setProperty('--greyDark', '#9baacf');
        root.style.setProperty('--primary-dark', '#5b0eeb');
        root.style.setProperty('--primary', ' #6d5dfc');
        root.style.setProperty('--primary-light', '#8abdff');
        theme = 'dark';
    }
    else {
        root.style.setProperty('--font-color', ' #fff');
        root.style.setProperty('--bg-color', '#191A1E');
        root.style.setProperty('--box-shadow', '.8rem .8rem 1.4rem #0e0e0e, -.2rem -.2rem 1.8rem rgb(95 94 94 / 25%)');
        root.style.setProperty('--inner-shadow', 'inset .2rem .2rem .5rem #0e0e0e, inset -.2rem -.2rem .5rem #5f5e5e');
        root.style.setProperty('--inner-shadow-dark', '10px 10px 59px -23px rgba(0,0,0,0.75) inset');
        root.style.setProperty('--e-shadow', '.3rem .3rem .6rem #c8d0e7, -.2rem -.2rem .5rem #fff');
        root.style.setProperty('--greyDark', '#9baacf');
        root.style.setProperty('--primary-dark', '#5b0eeb');
        root.style.setProperty('--primary', ' #6d5dfc');
        root.style.setProperty('--primary-light', '#8abdff');
        theme = 'light';
    }
}
switchTheme();