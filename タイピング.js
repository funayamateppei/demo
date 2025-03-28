$(document).ready(function() {
    const words = [
        'おはよう', 'あついね。','こんにちは', 
        'うふふ','こんばんわ','そうよね','ごめんね',
        'ありがとう', 'すみません', 'やっほー',
        'いいね！','わかりました。', 'そうなの？'];
    let 単語 = '';/**/ 
    let currentWordIndex = 0;
    let 残り時間 = 60;
    let timerInterval;

    function displayWord() {
        単語 = words[currentWordIndex];/*[単語」にcurrentWordIndex番目のwordsを代入*/ 
        $("#type-display").html(単語);/*「単語」をtype-displayに表示 */
        $("#type-input").val('');/*入力欄クリア */
        $("#type-input").focus();/*htmlのautofoucsと同じ動き*/
    }

    function startTimer() {
        timerInterval = setInterval(function() {
            残り時間--;
            $("#timer").text(残り時間);
            if (残り時間 <= 0) {
                clearInterval(timerInterval);
                alert('タイムアップ！');
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