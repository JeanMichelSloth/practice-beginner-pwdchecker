let passwordInputValue = "";
let rules = [
    { id:"length-rule", ruleFn: checkLengthRule, selected: false, checkOk: false },
    { id:"special-rule", ruleFn: checkSpecialRule, selected: false, checkOk: false },
    { id:"capital-rule", ruleFn: checkCapitalRule, selected: false, checkOk: false },
    { id:"number-rule", ruleFn: checkNumberRule, selected: false, checkOk: false },
    { id:"unichar-rule", ruleFn: checkUnicharRule, selected: false, checkOk: false }
];
const OK_IMG_SUFFIX = "-ok";
const KO_IMG_SUFFIX = "-ko";
const SHOW_STYLE = "display: inline";
const HIDE_STYLE = "display: none";

function checkPassword() {
    resetRules();
    getPasswordInput();
    getSelectedRules();
    checkSelectedRules();
    resetRulesStyle();
    styleRulesCheck();
}

function resetRules() {
    rules.forEach(rule => {
        rule.selected = false;
        rule.checkOk = false;
    });
}

function getPasswordInput() {
    passwordInputValue = document.getElementById("password").value;
}

function getSelectedRules() {
    rules.forEach(rule => {
        rule.selected = document.getElementById(rule.id).checked;
    });
}

function checkSelectedRules() {
    rules.forEach(rule => {
        if(rule.selected) {
            rule.ruleFn.apply();
        }
    })
}

function checkLengthRule() {
    if(passwordInputValue.length >= 9) {
        rules.find(rule => rule.id === "length-rule").checkOk = true;
    }
}

function checkSpecialRule() {
    if(passwordInputValue.match(/[^A-Za-z0-9 ]/g)) {
        rules.find(rule => rule.id === "special-rule").checkOk = true;
    }
}

function checkCapitalRule() {
    if(passwordInputValue.match(/[A-Z]/g) !== null) {
        rules.find(rule => rule.id === "capital-rule").checkOk = true;
    }
}

function checkNumberRule() {
    if(passwordInputValue.match(/[0-9]/g)) {
        rules.find(rule => rule.id === "number-rule").checkOk = true;
    }
}

function checkUnicharRule() {
    const generatedUnicharPassword = passwordInputValue[0].repeat(passwordInputValue.length);

    if(generatedUnicharPassword !== passwordInputValue) {
        rules.find(rule => rule.id === "unichar-rule").checkOk = true;
    }
}

function resetRulesStyle() {
    rules.forEach(rule => {
        document.getElementById(rule.id + OK_IMG_SUFFIX).style = HIDE_STYLE;
        document.getElementById(rule.id + KO_IMG_SUFFIX).style = HIDE_STYLE;
    });
}

function styleRulesCheck() {
    rules.forEach(rule => {
        if(rule.selected) {
            let elementSuffix = (rule.checkOk) ? OK_IMG_SUFFIX : KO_IMG_SUFFIX;
            document.getElementById(rule.id + elementSuffix).style = SHOW_STYLE;
        }
    });
}