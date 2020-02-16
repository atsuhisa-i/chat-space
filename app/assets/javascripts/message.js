$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
       `<div class="messages">
          <div class="messages-list">
            <div class="messages-list__name">
              ${message.user_name}
            </div>
            <div class="messages-list__date">
              ${message.created_at}
            </div>
          </div>
          <div class="messages__text">
            <p class="messages__text__content">
              ${message.content}
            </p>
            <img class="messages__text__image" src=${message.image}>
          </div>
        </div>`
      return html;
    } else {
      var html =
       `<div class="messages">
          <div class="messages-list">
            <div class="messages-list__name">
              ${message.user_name}
            </div>
            <div class="messages-list__date">
              ${message.created_at}
            </div>
          </div>
          <div class="messages__text">
            <p class="messages__text__content">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    };
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
     .done(function(data){
       var html = buildHTML(data);
       $('.main-chat__message').append(html);
       $('.main-chat__message').animate({ scrollTop: $('.main-chat__message')[0].scrollHeight});
       $('form')[0].reset();
       $('input').prop('disabled', false);
     })
     .fail(function() {
       alert("メッセージ送信に失敗しました");
     });
  })
});