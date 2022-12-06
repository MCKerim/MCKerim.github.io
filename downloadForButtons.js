function download(path, newName) {    
    //creating an invisible element
    var element = document.createElement('a');
    element.setAttribute('href',
    'data:text/plain;charset=utf-8, '
    + encodeURIComponent(path));

    element.setAttribute('download', newName);
 
    document.body.appendChild(element);

    element.click();
 
    document.body.removeChild(element);
}