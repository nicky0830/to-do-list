const body = document.querySelector("body"); 

const IMG_NUMBER = 3; 

function handleImgLoad(){ 
console.log("finished loading"); 
}

function paintImage(imgNumber){ 
    const image = new Image();
    image.src =  `./${imgNumber + 1}.jpg`;
    image.classList.add("bgImage");
    body.appendChild(image);
    image.addEventListener("loaded", handleImgLoad); 
    // 엄청 애먹은 부분 : img.src의 경로 구하기가 어려움. 
    // 상대 경로: 지금 있는 파일과 같은 파일이면 "./불러올파일이름.jpg(png 등)" => ./로 시작
    // 절대 경로: 전체에서 경로 찾아서 들어가는 "/폴더이름/파일이름.jpg"
    // src의 경로는 ""로 string으로 씀. 위와 같이 백틱을 쓰면 해당 부분을 변수처럼 사용하면서 전체를 string처럼 사용한다 
    // addEventListner(loaded)는 function과 함께 로딩할 때 사용한다
}

function getRandom(){ 
    const number = Math.floor(Math.random() * IMG_NUMBER); 
    return number;
}

function init(){ 
    const randomNumber = getRandom(); 
    paintImage(randomNumber);

}

init();