$(document).on('turbolinks:load', function(){ //リロードしなくてもjsが動くようにする
  $(document).on('keyup', '#form', function(e){ //このアプリケーション(document)の、formというid('#form')で、キーボードが押され指が離れた瞬間(.on('keyup'...))、eという引数を取って以下のことをしなさい(function(e))
    e.preventDefault(); //キャンセル可能なイベントをキャンセル
    var input = $.trim($(this).val()); //この要素に入力された語句を取得し($(this).val())、前後の不要な空白を取り除いた($.trim(...);)上でinputという変数に(var input =)代入
    $.ajax({ //ajax通信で以下のことを行います
      url: '/emojis/search', //urlを指定
      type: 'GET', //メソッドを指定
      data: ('keyword=' + input), //コントローラーに渡すデータを'keyword=input(入力された文字のことですね)'にするように指定
      processData: false, //オブジェクトをクエリ文字列に変換するかどうかの設定
      contentType: false, //
      dataType: 'json' //データ形式を指定
    })
    .done(function(data){ //データを受け取ることに成功したら、dataを引数に取って以下のことする(dataには@emojisが入る)
      $('#result').find('li').remove();  //idがresultの子要素のliを削除する
      $(data).each(function(i, emoji){ //dataをemojiという変数に代入して、以下のことを繰り返す
        $('#result').append(
          '<li class = "emoji '+ emoji.name + '">' +
           '<a href= ' + ' "/emojis/'+emoji.id+'">' +
          '<div>' +
          ' <img src ="'+ emoji.image.url + '">' +
          '</div>' +
          '<div class = "name">'+
          ' :'+ emoji.name +':' +
          '</div>' +
          '</a>' +
          '<div class="btn-social-giza">' +
            '<a href="' + emoji.image.url +'" class="btn-social-giza-twitter" download="'+ emoji.name +'.png">' +
            '<span class="fa-stack">' +
            '<i class="fa fa-certificate fa-stack-2x"></i>' +
            '<i class="fas fa-download fa-stack-1x"></i>' +
            '</span>'+
          '</a>' +

          '</div>' +
          '</li>' )
           //resultというidの要素に対して、<li class ="emoji">...</li>を追加する。
  });
});
  });
});
