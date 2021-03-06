fieldTypes.password = {
    icon: 'fa-lock',
    getEditVal: function(input){
        var val=input.val().trim();
        var error = false;
        if (val === undefined || val === '' || val === null) {
            notify = 'Поле ' + this.title + ' должно быть заполнено';
            error = true;
        }
        if (error) throw notify;

        return val;
    },
    getCellText: function (val) {
        return '**PASSWORD**';
    },
    getEditElement: function ($oldInput, oldValue, item, enterClbk, escClbk, blurClbk, tabindex) {
        var $input = $('<input type="password" name="cell_edit" class="form-control" readonly autocomplete="off" autocorrect="off" placeholder="'+(oldValue?'Поменять пароль':'Новый пароль')+'"/>');

        setTimeout(function () {
            if($input){
                $input.removeAttr('readonly');
            }
        }, 2000);

        $input.on('save-me', function (event) {
            enterClbk($(this), event);
        });


        if (tabindex) $input.attr('tabindex', tabindex);

        var field = this;
        oldValue=oldValue.v;
        $input.on('keyup', function (event) {
            switch (event.keyCode) {
                case 13:
                    try{
                        $input.data('enterClicked', true);
                        enterClbk($(this), event);
                    }
                    catch (err){
                        $input.data('enterClicked', false);
                        App.popNotify(err, $input, 'default');
                        field.focusElement($input);
                    }
                    break;
                case 27:
                    escClbk($(this), event);
                    break;
            }
        })

        var blur = function(event) {
            blurClbk($input, event);
            return;
        }
        $input.one('blur', function (event) {
            setTimeout(function(){blur(event)}, 50);
        });
        return $input.select();
    },
};