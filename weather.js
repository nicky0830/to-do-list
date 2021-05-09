const weather = document.querySelector(".js-weather")
const COORDS = 'coords'; 
const API_KEY = "67cc9c91c4e1c6043c4b48bcf42171fd";
// api는 다른 서버에서 디자인 없이 데이터만 주고 받을 수 있도록 한다 
// API를 이용하면 제공되는 url 중 골라서 localStorage에 저장되어 있는 JSON.Stringify한 정보처럼 가져올 수 있다
// longitude, latitude니까 geographical api 구한다 
// 웹사이트로 request를 보내고 응답을 통해 데이터를 얻을 수 있음 refresh없이 내 웹사이트에 적용 가능 
// (새로고침하지 않아도 보이지 않는 곳에서 계속 데이터가 오고 있기 때문에 ) 


function getWeather(lat, lng){ 
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`).then(function(response){
        return response.json();
        // then은 api를 fetch한 이후에 function을 부른다. 이 function은 url 안에 있는 response를 부른다. 
        // 하지만 url에 있는 정보는 (해당 url을 쳐봐도 알겠지만) Json이라는 객체로 되어 있다. 그러므로 정보에 접근하려면 객체에 들어가야 한다
        // 이를 활용하기 위해서 json()으로 받아온다 (함수 같이 생겼는데 이게 키인건가? 아니면 )
    }).then( function(json){
        const temperature = json.main.temp; 
        const place = json.name;
        weather.innerText = `${temperature}@${place}`;

    }
    // json()하는데 시간이 걸리니까 불러온 다음에 (then 사용해서 순차적으로 실행되게 함. then 안 사용했으면 fetch안됬는데 다음 function으로 넘어갈 수도 있음)
    // 또 다시 then을 사용해서 function에 json을 매개변수의 인자로 넣어 console.log시킨다(근데 왜 한번 더 하니까 대기가 아니지? 기다려야 할때 then을 쓰면 이후의 결과로 활용할 수 있다)
    )
}
// loadCoord가 null이면 아래 handleGeoSucess 실행되어서 saveCoords하면서 없었던 위도, 경도 정보가 들어가고 getWeather가 실행되지만 network를 확인하면 fetch된 api가 없다 
// 이는 saveCoords에서 위도, 경도를 object가 아니라 string으로만 localStorage에 value로 저장할 수 있기 때문이다
// 그러므로 null이 아닐 때 이미 저장되어 있는 coords를 parse해서 다시 object로 만든 다음에야 latitude, longitude를 키로 찾을 수 있다
// fetch하는 url 끝에 units = metric으로 하면 화씨를 섭씨로 바꿀 수있다 

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
    // 이때 handleGeoSucces의 매개변수에 들어가는 건 이를 통해 얻은 current position(잘 모르겠으면 상수에 넣어서 console.log으로 메서드 확인해보기)
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null ){ 
        askForCoords();
    } else{ 
     const parseCoords = JSON.parse(loadedCoords);
     getWeather(parseCoords.latitude, parseCoords.longitude);

    }
} 

function init(){
    loadCoords();
}

init(); 