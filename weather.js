const COORDS = 'coords'; 
const API_KEY = "67cc9c91c4e1c6043c4b48bcf42171fd";
// api는 다른 서버에서 디자인 없이 데이터만 주고 받을 수 있도록 한다 
// API를 이용하면 제공되는 url 중 골라서 localStorage에 저장되어 있는 JSON.Stringify한 정보처럼 가져올 수 있다
// longitude, latitude니까 geographical api 구한다 
// 웹사이트로 request를 보내고 응답을 통해 데이터를 얻을 수 있음 refresh없이 내 웹사이트에 적용 가능 
// (새로고침하지 않아도 보이지 않는 곳에서 계속 데이터가 오고 있기 때문에 ) 


function getWeather(lat, lng){ 
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}`)
}

function saveCoords(coordsObj){ 
    localStorage.setItem(COORDS, JSON.stringify(coordsObj))
}
// localStorage에 coords에 해당하는 value가 없으면 askForCoords때문에 handleGeoSuccess, handleGeoError 두 함수가 발동이 된다 
// 이때 handleGeoSuccess는 1)getWeather에 askForCoords에서 구한 위도, 경도를 대입해서 위도, 경도로 데이터를 구할 수 있는 API에 대입한다 + API_KEY대입
// 2)saveCoords에 cordsObj(위도, 경도를 넣은)를 string으로 만들어서 coords키의 value로 넣는다    

function handleGeoSuccess(position){
    const latitude = position.coords.latitude; 
    const longitude = position.coords.longitude; 
    const coordsObj = { 
        latitude, 
        longitude
    }
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
    // latitude를 키로 latitude를 value로 정하려면 원래 latitude: latitude이지만 JS에서는 위처럼 latitude라고 하나만 쳐도 됨
}


function handleGeoError(){ 
    console.log("Can't access geolocation");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
    // navigator(API의 종류: window, document 등등이 있음). navigator의 메서드 중 geolocation의 getCurrentPosition은 뒤 두개의 함수를 requirement로 가진다 

}

function loadCoords(){
    const loadedCords = localStorage.getItem(COORDS);
    if(loadedCords === null ){ 
        askForCoords();
    } else{ 
     const parseCoords = JSON.parse(loadCoords)

    }
} 

function init(){
    loadCoords();
}

init(); 