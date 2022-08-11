
const botonLogout = document.getElementById('botonLogout')
botonLogout.addEventListener('click', e => {
    e.preventDefault()
    // console.log(window.location.pathname);
    window.location.assign('/logout')

})
