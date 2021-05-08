// filter, forEach 함수 예시

const toDoForm = document.querySelector(".js-toDoForm"), 
 toDoInput = toDoForm.querySelector("input"),
 toDoList = document.querySelector(".js-toDoList");
// index.js와 같은 이름을 쓰면 충돌 그러므로 다른 이름 사용. 물론 같은 이름을 사용하는 방법도 있지만 그건 심화

const TODOS_LS = 'toDos';
let toDos = [];


function deleteToDO(event){ 
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){ 
        return toDo.id !== parseInt(li.id);
        // toDos 배열에 filter로 각 원소의 id가 li(누른 button의 부모)의 id와 다르면 반환(즉 delBtn을 누르지 않은 나머지만 반환, 누른 것이 사라져보임)
    });
    toDos = cleanToDos
    saveToDos();
    // delBtn을 "click"하면 deleteTodo가 작동되는데 이 함수는 delBtn에 대한 것이므로 함수의 event의 target은 <button>이라는 것이 있다
    // button은 li의 appendChild해서 자식 parentNode로 반대로 부모를 찾을 수 있다/ removeChild로 toDoList에서 li 제거 가능
    // 하지만 이는 화면상에서만 없앤 것, localStorage에 아직 남아있어서 새로고침하면 다시 나타난다
    // filter는 foreach처럼 function을 원소 하나하나에 적용, filterFn(toDos배열의 원소 하나씩 적용)을 toDos에 하나씩 적용/ filterFn은 toDos의 id가 1이 맞으면 해당 원소를 반환한다(즉 return 뒤 true인 원소들만 모아서 array를 만든다)
// toDos 배열을 새롭게 제거한 cleanToDos로 바꾸고 saveToDos로 바뀐 배열을 string으로 바꿔 TODOS_LS('toDos')의 value로 넣는다

}

// saving todos : need to be an array because there are many
 

function saveToDos(){ 
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
    // TODOS_LS를 키, value는 toDos ([]안에 배열)
    // JSON.stringfy는 어떤 것이든 string으로 저장한다
}

function paintToDo(text){ 
    const li = document.createElement("li");
    const delBtn = document.createElement("button"); 
    const span = document.createElement("span");
    const newId = toDos.length + 1; 
    delBtn.innerHTML = "❌";
    delBtn.addEventListener("click", deleteToDO); 
    span.innerText = text;
    li.appendChild(span); 
    // father element인 li안에 span을 자식으로 넣는다
    li.appendChild(delBtn);
    li.id = newId; 
    // todo를 골라서 삭제하기 쉽게 id를 정해놓는다
    toDoList.appendChild(li); 
    const toDoObj = { 
        text: text, 
        id: newId
        }; 
    toDos.push(toDoObj);
    saveToDos();

    // html을 가져다 쓰는 것이 아니라 아예 html을 만들어 쓰는 방법

}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value; 
    paintToDo(currentValue);
    toDoInput.value = "";
}
// enter(submit)을 했을 때 form안 input이 사라지게 한다

function loadToDos(){ 
    const loadedToDos = localStorage.getItem(TODOS_LS);
    // key가 toDos인 value를 가져와라
    // 하지만 자바스크립트의 data를 localstorage에 넣을 수 없다. only String!
    // loadedToDos는 localStorage에 저장된 형태이므로 String(문자가 나열된 형태)
    if (loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos); 
        parsedToDos.forEach(function(toDos){
            paintToDo(toDos.text);
        });
         // Javascript Object Notation : object를 string으로 만들거나 반대 가능 
        // localStorage에 string으로 저장했으니까 이제 다시 object로 바꿔야(이는 객체처럼 안에 속성이 있다)
        // parsedToDOs안에 있는 모든 것에 paintToDo를 적용한다. 이때 배열의 원소 하나하나에 적용해야 하니까 forEach()를 사용한다
        // 여기서는 만들어진 함수를 호출하는 것이 아니라 안에 만드는 중. toDos안에 있는 원소 하나하나를 받을 거니까 매개변수를 toDos로 잡고 
        // 해당 인자의 tex 

    }
    

}

function init(){
 loadToDos(); 
 toDoForm.addEventListener("submit", handleSubmit)
}

init();