
var app = {
  server: "http://127.0.0.1:3000/classes/messages",
  init : () =>  $(document).ready(() => {
    app.fetch();
    name();
    $(document).on('click', '#fetch-btn', app.fetch);
    $(document).on('click', '#post-message', app.send);
    $(document).on('click', '.username', app.handleUsernameClick);
    $(document).on('submit', '#send .submit', app.handleSubmit);
    $(document).on('click', '#post-message', app.renderRoom);
    $(document).on('change', '#roomSelect', app.room);

  }),

  send : function(data) {
    $.ajax({
      type: 'POST',
      url: app.server,
      contentType: 'application/json',
      data: JSON.stringify({
        username: data.username || $('#username').val(),
        text: data.text || $('#text').val(),
        roomname: data.roomname || $('#roomname').val()
      }),
      success: () => app.fetch()
    });
  },
  fetch: function() {
    $.ajax({
      type : 'GET',
      url: app.server,
      success: (data) => {
        console.log(data)
        console.log(typeof data)
        // console.log(data)
        $('#chats').html('');
        var list = [];
        for(var i = 0; i<data.length; i++) {
          if(!list.includes(data[i].roomname)) list.push(data[i].roomname);
        }
        for(var j = 0; j<list.length; j++) {
          app.renderRoom(list[j]);
        }
        data.forEach(({username, text, roomname, date}) => {
          const $p = $(`<p><span class="username">${escapeHtml(username)}</span>: ${escapeHtml(text)} (<span class="postedRoom">${escapeHtml(roomname)}</span> @${date}) </p>`);
          $('#chats').prepend($p);
        });

      },
    });
  },
  room: function() {
    var selectedRoom = $('#roomSelect option:selected').val();
    $.ajax({
      type: 'GET',
      url: app.server,
      success: (data) => {
        // console.log(data)

        $('#chats').html('');
        data.forEach(({username, text, roomname, date}) => {
          if (roomname === selectedRoom) {
            const $p = $(`<p><span class="username">${escapeHtml(username)}</span>: ${escapeHtml(text)} (<span class="postedRoom">${escapeHtml(roomname)}</span> @${date}) </p>`);
            $('#chats').prepend($p);
          // }
          }
        });
      }
    });
  },

  handleUsernameClick: function() {
    friend.push($(this).text())
    $.ajax({
      type : 'GET',
      url: app.server,
      success: (data) => {
        // console.log(data)

        $('#chats').html('');
        data.forEach(({username, text, roomname, date}) => {

          if (friend.includes(username)) {
            const $p = $(`<p  style ="font-weight : bold"><span class="username">${escapeHtml(username)}</span>: ${escapeHtml(text)} (<span class="postedRoom">${escapeHtml(roomname)}</span> @${date}) </p>`);
            $('#chats').prepend($p);
          } else {
            const $p = $(`<p><span class="username">${escapeHtml(username)}</span>: ${escapeHtml(text)} (<span class="postedRoom">${escapeHtml(roomname)}</span> @${date}) </p>`);
            $('#chats').prepend($p);
          }
        });
      }
    });
  },

  clearMessages: function() {
    $('#chats').empty();
  },
  renderMessage: function(msg) {
    var date = new Date();
    const $p = $(`<p><span class="username">${escapeHtml(msg.username)}</span>: ${escapeHtml(msg.text)} (<span class="postedRoom">${escapeHtml(msg.roomname)}</span> @${escapeHtml(msg.date)}) </p>`);
    $('#chats').append($p);
  },
  renderRoom: function(roomName) {
    roomName = $('#roomname').val() || roomName;
    $('#roomSelect').append('<option>' +roomName+'</option>');
  },

  handleSubmit: function() {
    console.log(1);
  }

};

var friend = [];

var entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;'
};
function escapeHtml (string) {
  return String(string).replace(/[&<>"'`=\/]/g, function (s) {
    return entityMap[s];
  });
}

function name() {
  var text = prompt('이름을 입력하세요.', '홍길동');
  while (!text) {
    text = prompt('이름을 입력하세요.', '홍길동');
  }
  $('#username').attr('value', text);
}

var friends = [];


app.init();
