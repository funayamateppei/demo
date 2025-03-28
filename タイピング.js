$(document).ready(function() {
    const words = [
        'おはよう', 'あついね。','こんにちは', 
        'うふふ','こんばんわ','そうよね','ごめんね',
        'ありがとう', 'すみません', 'やっほー',
        'いいね！','わかりました。', 'そうなの？'
    ];
    let 単語 = '';
    let currentWordIndex = 0;
    let 残り時間 = 60;
    let timerInterval;
    let typedWordCount = 0; // Enterキーを押して進めた単語数をカウントする変数

    function displayWord() {
        単語 = words[currentWordIndex];
        $("#type-display").html(単語);
        $("#type-input").val('');
        $("#type-input").focus();
    }

    function startTimer() {
        timerInterval = setInterval(function() {
            残り時間--;
            $("#timer").text(残り時間);
            if (残り時間 <= 0) {
                clearInterval(timerInterval);
                window.location.href = 'タイムアップ.html?count=' + typedWordCount; // 遷移先のページにEnterキーを押した回数を渡す
                $("#type-input").prop("disabled", true);
            }
        }, 1000);
    }
    
    displayWord();
    startTimer();

    $("#type-input").on('input', function() {
        let input = $(this).val();
        let display = '';
        let isCorrect = true;

        for (let i = 0; i < 単語.length; i++) {
            if (input[i] === 単語[i]) {
                display += 単語[i];
            } else {
                display += '<span style="color: red;">' + 単語[i] + '</span>';
                isCorrect = false;
            }
        }
        $("#type-display").html(display);

        if (input === 単語) {
            $("#result").text('正解！');
        } else {
            $("#result").text('');
        }
    });

    $("#type-input").on('keydown', function(event) {
        if (event.key === 'Enter') {
            if ($(this).val() === 単語) {
                typedWordCount++; // Enterキーを押した回数をインクリメント
                currentWordIndex++;
                if (currentWordIndex < words.length) {
                    displayWord();
                } else {
                    alert('ゲームクリア！');
                    clearInterval(timerInterval);
                    $("#type-input").prop("disabled", true);
                }
            }
        }
    });
});