const form = document.querySelector(".js-form"),    
input = form.querySelector("input"), 
greeting = document.querySelector(".js-greetings");
// user이름 표현할 용 <h4>

// 상수 정의할 때 const 상수이름 = 정의, 다른 상수이름 = 정의 같은 방식으로 연달아 쓰면 
// 두번째부터 const 없이 사용 가능 

const USER_LS = "currentUser",
Showing_cn = "showing";
// "이름" 정한 상수는 className이나 id로 css에서 사용하려고 만들어놓는 편

function saveName(text) { 
    localStorage.setItem(USER_LS,text);
}

function handleSubmit(event){ 
    event.preventDefault();
    const currentValue = input.value; 
    paintGreeting(currentValue);
    saveName(currentValue);
}

// form은 디폴트로 document에 보내기 때문에 그걸 막아야 한다 
// input.palceholder = 하면 다른 값을 넣을 수  마찬가지로 input.value하면 form에 넣은 값을 구할 수 있다 
// input한 값은 painGreeting의 인자로 들어가 hello input.value이 나온다
// 하지만 이때 값이 저장되지는 않는다 그러므로 saveName()함수를 만든다 이는 setItem으로 localStorage에 User_LS(currentUser)를 키로 value text를 넣는다
// 이때 value로 넣는 text는 함수의 인자인데 handleSubmit함수에서 currentVlaue 즉 input한 값으로 넣는다

function askForName(){ 
 form.classList.add(Showing_cn);
 form.addEventListener("submit", handleSubmit);
}

// showing추가되서 form이 보인다. form에 만약 제출이 된다면 handleSubmit 함수가 실행된다 
function paintGreeting(text){
    form.classList.remove(Showing_cn);
    greeting.classList.add(Showing_cn);
    greeting.innerText = `Hello ${text}`;
}

// // classList는 class 존재 true flase로 if조건문을 사용할 때 이미 있는 class를 제거할 수도 있으니까 
// // 존재 여부가 아닌 class의 List에 새로운 class를 추가하는 식으로 사용할 수 있다
// // 위와 같이 form(form태그), greeting(h4태그 id)의 classList에서 Showing_cn(즉 showing이라는 className)을 추가하거나 제거할 수 있다
// showing이라는 className은 css에서 display: block로 설정되어 있다 그러므로 form을 .form의 css인 display:none, 역시 display:none이었던 greeting(h4)를 block으로 만든다 
// 아래 innerText는 h4의 태그 속 내용을 Hello 인자로 바꾼다. 그러므로 이 인자는 userName이 되도록 해야 한다. 
// username은 아래 function loadName에서 가져온다. 


function loadName(){ 
 const currentUser = localStorage.getItem(USER_LS);
 if (currentUser === null){ 
     askForName();
    //  form을 보이게 한다
 }else{ 
     paintGreeting(currentUser);
 }
}

// localStorage는 브라우저에 저장된 정보. 이때 키로 USER_LS(currentUser)의 value를 const currentUser에 넣는다 
// 1.만약 currentUser의 value가 저장되어 있으면 paintGreeting의 인자에 currentUser(currentUser의 value)를 넣는다
// 그러면 hello value가 나온다 
// 그럼 앞으로 해야할 내용은 localStorage에 currentUser의 value에 사용자의 이름을 저장하는 방법이다
// 2.저장되어 있지 않으면 askForName()

function init(){ 
    loadName();
}

init();

// init()는 모든 함수를 실행시키기 위해 존재하는 함수 
// function init()안에 다른 함수를 실행시켜 연차적으로 가능
