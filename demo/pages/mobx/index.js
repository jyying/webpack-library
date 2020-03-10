import { observable } from "mobx"

class Todo {
  id = Math.random();
  @observable title = "";
  @observable finished = false;
}


export const test = function (type, value) {
  info[type] = value
}

const info = {

}

export const getInfo = function () {
  return info
}

test('name', '张1')