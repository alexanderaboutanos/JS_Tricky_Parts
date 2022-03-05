/** @format */

function createAccount(initialPin, amount = 0) {
  let pin = parseInt(initialPin);
  let balance = amount;
  return {
    checkBalance: function checkBalance(pinAttempt) {
      return pinAttempt == pin ? `$${balance}` : "Invalid PIN.";
    },
    deposit: function deposit(pinAttempt, amt) {
      if (pinAttempt != pin) return "Invalid PIN.";
      balance += amt;
      return `Succesfully deposited $${amt}. Current balance: $${balance}.`;
    },
    withdraw: function withdraw(pinAttempt, amt) {
      if (pinAttempt != pin) return "Invalid PIN.";
      if (amt > balance)
        return "Withdrawal amount exceeds account balance. Transaction cancelled.";
      balance -= amt;
      return `Succesfully withdrew $${amt}. Current balance: $${balance}.`;
    },
    changePin: function changePin(pinAttempt, newPin) {
      if (pinAttempt != pin) return "Invalid PIN.";
      pin = newPin;
      return "PIN successfully changed!";
    },
  };
}

module.exports = { createAccount };
