    // 何問目かを管理する変数
    let step = 0

    // クイズのリストを配列で管理
    const quizList = [
      {
        question: "電源ボタンはどっち？",
        leftImg: "IMG.2.jpg",
        rightImg: "IMG.1.jpg",
        answer: "left",
      },
      {
        question: "音量ボタンはどっち？",
        leftImg: "IMG.3.jpg",
        rightImg: "IMG.1.jpg",
        answer: "left",
      },
      {
        question: "ホームボタンはどっち？",
        leftImg: "IMG.3.jpg",
        rightImg: "IMG.1.jpg",
        answer: "right",
      }
    ]

    // 背景画像が読み込まれたら、quiz-boxのサイズを背景画像のサイズに合わせる
    const backgroundImage = document.querySelector(".background-image")
    backgroundImage.onload = function () {
      const quizBox = document.querySelector(".quiz-box")
      quizBox.style.width = backgroundImage.width + "px"
      quizBox.style.height = backgroundImage.height + "px"
    }

    // step番目のクイズを表示する関数
    function renderQuiz() {
      const quiz = quizList[step]
      $(".question").text("問題" + (step + 1) + "\n" + quiz.question)
      $("#left").attr("src", quiz.leftImg)
      $("#right").attr("src", quiz.rightImg)
    }

    // 答えが正しいかどうかをチェックする関数
    function checkAnswer(answer) {
      const quiz = quizList[step]
      if (quiz.answer === answer) {
        // 正解の処理
        $("#success").text("正解！！").show(); // 正解のメッセージを表示
        setTimeout(function () {
            $("#success").hide(); // 正解のメッセージを非表示
            step++; // stepを1増やす -> 次の問題に進む
            if (step < quizList.length) {
                renderQuiz(); // 次の問題を表示
            } else {
                window.location.href = "ooo.html"; // 全問正解の場合、correct.htmlに遷移
            }
        }, 1000);
    } else {
        // 不正解の処理
        $("#success").text("不正解！！").removeClass("success").addClass("incorrect").show(); // 不正解のメッセージを表示
        setTimeout(function () {
            window.location.href = "xxx.html"; // 1秒後にincorrect.htmlに遷移
        }, 1000);
    }
}

    // 背景画像が読み込まれたら、クイズを表示する
    window.onload = function () {
      if (backgroundImage.complete) {
        backgroundImage.onload()
        renderQuiz(step)
      }
    }

    // 左右の画像をクリックしたときの処理
    $("#left").click(function () {
      checkAnswer("left")
    })
    $("#right").click(function () {
      checkAnswer("right")
    })
