const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList"),
  asIsList = document.querySelector(".js-asIsList");

const TODOS_LS = `toDos`;
const ASISS_LS = `asIss`;
const TODO_UL_CL = `js-toDoList`;
const ASIS_UL_CL = `js-asIsList`;

let toDos = [];
let asIss = [];

function paintTodo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const movBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = schedule.UUID();
  delBtn.innerText = "X";
  movBtn.innerText = "V";
  delBtn.addEventListener("click", schedule.delete);
  movBtn.addEventListener("click", schedule.move);
  span.innerHTML = text;

  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(movBtn);

  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };

  toDos.push(toDoObj);
  schedule.save();
}

function paintAsIs(obj) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const movBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = obj.id;
  delBtn.innerText = "X";
  movBtn.innerText = "V";
  delBtn.addEventListener("click", schedule.delete);
  movBtn.addEventListener("click", schedule.move);
  span.innerHTML = obj.text;

  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(movBtn);

  li.id = newId;
  asIsList.appendChild(li);
  const asIsObj = {
    text: obj.text,
    id: newId
  };

  asIss.push(asIsObj);
  schedule.save();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintTodo(currentValue);
  toDoInput.value = "";
}

const schedule = {
  load: function() {
    const loadedTodos = localStorage.getItem(TODOS_LS);
    const loadedAsIss = localStorage.getItem(ASISS_LS);
    if (loadedTodos !== null) {
      const parsedToDos = JSON.parse(loadedTodos);
      parsedToDos.forEach(function(data) {
        paintTodo(data.text);
      });
    }
    if (loadedAsIss !== null) {
      const parsedAsIss = JSON.parse(loadedAsIss);
      parsedAsIss.forEach(function(data) {
        paintAsIs(data);
      });
    }
  },
  move: function(e) {
    e.preventDefault();
    const btn = e.target;
    const li = btn.parentNode;
    const ul = li.parentNode;

    if (ul.className === TODO_UL_CL) {
      toDoList.removeChild(li);
      const addToDos = toDos.filter(function(toDo) {
        return toDo.id === li.id;
      });
      const cleanToDos = toDos.filter(function(toDo) {
        return toDo.id !== li.id;
      });
      toDos = cleanToDos;
      schedule.save();
      paintAsIs(addToDos[0]);
    } else {
      asIsList.removeChild(li);
      const pickAsIss = asIss.filter(function(asIs) {
        return asIs.id === li.id;
      });
      const cleanAsIss = asIss.filter(function(asIs) {
        return asIs.id !== li.id;
      });
      asIss = cleanAsIss;
      schedule.save();
      paintTodo(pickAsIss[0].text);
    }
  },
  save: function() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
    localStorage.setItem(ASISS_LS, JSON.stringify(asIss));
  },
  delete: function(e) {
    e.preventDefault();
    const btn = e.target;
    const li = btn.parentNode;
    const ul = li.parentNode;

    if (ul.className === TODO_UL_CL) {
      toDoList.removeChild(li);
      const cleanToDos = toDos.filter(function(toDo) {
        return toDo.id !== li.id;
      });
      toDos = cleanToDos;
    } else {
      asIsList.removeChild(li);
      const cleanAsIss = asIss.filter(function(asIs) {
        return asIs.id !== li.id;
      });
      asIss = cleanAsIss;
    }
    schedule.save();
  },
  UUID: function() {
    var dt = new Date().getTime();
    var uuid = "xxxy-xxyx-xyxx-yxxx-xxxx".replace(/[xy]/g, function(c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
  }
};

function init() {
  schedule.load();
  toDoForm.addEventListener("submit", handleSubmit);
}
init();
