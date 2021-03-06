/*
Author:Vincent Salamera
Date Created: May 16 2019
*/
const switchBtns = [].slice.call(document.getElementsByClassName('switch-btn'))
const tabBtn = document.getElementById("newTabBtn");

switchBtns.forEach((element, index) => {
  element.addEventListener('click', (env) => {
    if(tabBtn.checked){
      chrome.tabs.query({active: true, currentWindow: true}, function(tab) {
        chrome.tabs.create({ url: switchModeTo(checkUrl(tab[0].url),env.target.value,tab[0].url) })
      })
    }
    else{
      removeActive(switchBtns)
      chrome.tabs.query({active: true, currentWindow: true}, function(tab) {
        chrome.tabs.update(tab.id, {url: switchModeTo(checkUrl(tab[0].url),env.target.value,tab[0].url)})
      })
      element.classList.add("active")
    }
  })
})

function onWindowLoad(){
  let currentUrl = ''  
  removeActive(switchBtns)
  chrome.tabs.query({active: true, currentWindow: true}, function(tab) {
    currentUrl = checkUrl(tab[0].url)    
    switchBtns.forEach((element, index) => {
      if(currentUrl =='siteAdmin'){
        element.classList.add("disabled")
        element.disabled = true
        if(element.value == currentUrl){
          element.classList.add("hidden")
        }
      }
      else{
        if(element.value == currentUrl){
          element.classList.add("active")
        }
      }
    })
  })
}

function removeActive(elements){
  elements.forEach((element, index) => {
      element.classList.remove("active")
  })
}

function switchModeTo(currentMode,toEnv,url){
  if(currentMode =='author' && toEnv =='author'){
    return url
  }
  else if(currentMode =='author' && toEnv =='viewPublish'){
    return url.replace(/editor.html\//,'') + '?wcmmode=disabled'
  }
  else if(currentMode =='author' && toEnv =='publish'){
    return url.replace(/author-|editor.html\/|\?wcmmode=disabled/g,'')
  }
  else if(currentMode =='author' && toEnv =='siteAdmin'){
    return url.replace(/editor.html/g,'sites.html').replace(/\.html+$/g,'')
  }

  else if(currentMode =='viewPublish' && toEnv =='viewPublish'){
    return url
  }
  else if(currentMode =='viewPublish' && toEnv =='author'){
    let x = url.slice(0, url.indexOf('content/informa/'))
    return url.replace(x,x+'editor.html/').replace(/\?wcmmode=disabled/,'')
  }
  else if(currentMode =='viewPublish' && toEnv =='publish'){
    return url.replace(/author-|editor.html\/|\?wcmmode=disabled/g,'')
  }
  else if(currentMode =='viewPublish' && toEnv =='siteAdmin'){
    let x = url.slice(0, url.indexOf('content/informa/'))
    return url.replace(x,x+'sites.html/').replace(/\.html\?wcmmode=disabled/,'')
  }

  else if(currentMode =='publish' && toEnv =='publish'){
    return url
  }
  else if(currentMode =='publish' && toEnv =='author'){
    let y = url.slice(0, url.indexOf('informa-'))
    let url2 = url.replace(y,y+'author-')
    let x = url2.slice(0, url2.indexOf('content/informa/'))
    return url2.replace(x,x+'editor.html/')
  }
  else if(currentMode =='publish' && toEnv =='viewPublish'){
    let y = url.slice(0, url.indexOf('informa-'))
    return url.replace(y,y+'author-') + '?wcmmode=disabled'
  }
  else if(currentMode =='publish' && toEnv =='siteAdmin'){
    let y = url.slice(0, url.indexOf('informa-'))
    let url2 = url.replace(y,y+'author-')
    let x = url2.slice(0, url2.indexOf('content/informa/'))
    return url2.replace(x,x+'sites.html/').replace(/\.html+$/g,'')
  }
}

function checkUrl(url) {
  let pub = '?wcmmode=disabled'
  let author = 'editor.html/'
  let admin = 'sites.html/'

  if(url.indexOf(author) >= 0){
    return 'author'
  }
  else if(url.indexOf(pub) >= 0){
    return 'viewPublish'
  }
  else if(url.indexOf(admin) >= 0){
    return 'siteAdmin'
  }
  else if(url.indexOf(author) < 0 && url.indexOf(pub) < 0 && url.indexOf(admin) < 0){
    return 'publish'
  }
  
}


window.onload = onWindowLoad;
