'use strict';

// alert(1);

let List = $('.tdlApp ul');
let Mask = 'tdl_';

function showTasks() {
    // Узнаём размер хранилища
    let Storage_size = localStorage.length;
    // Если в хранилище что-то есть…
    if (Storage_size > 0) {
      // то берём и добавляем это в задачи  
      for (let i = 0; i < Storage_size; i++) {
        let key = localStorage.key(i);
        if (key.indexOf(Mask) == 0) {
          // и делаем это элементами списка
          $('<li></li>').addClass('tdItem')
            .attr('data-itemid', key)
            .text(localStorage.getItem(key))
            .appendTo(List);
        }
      }
    }
  };

  showTasks();

  $('.tdlApp input').on('keydown', function (e) {
    if (e.keyCode != 13) return;
    let str = e.target.value;
    e.target.value = "";
    // Если в поле ввода было что-то написано — начинаем обрабатывать
    if (str.length > 0) {
      let number_Id = 0;
      List.children().each(function (index, el) {
        let element_Id = $(el).attr('data-itemid').slice(4);
        if (element_Id > number_Id)
          number_Id = element_Id;
      })
      number_Id++;
      // Отправляем новую задачу сразу в память
      localStorage.setItem(Mask + number_Id, str);
      // и добавляем её в конец списка
      $('<li></li>').addClass('tdItem')
        .attr('data-itemid', Mask + number_Id)
        .text(str).appendTo(List);
    }
  });

  $(document).on('click', '.tdItem', function (e) {
    // Находим задачу, по которой кликнули
    let jet = $(e.target);
    // Убираем её из памяти
    localStorage.removeItem(jet.attr('data-itemid'));
    // и убираем её из списка
    jet.remove();
  });