const form = document.getElementById("payment-form");

var authorization = $.ajax({
  type: "GET",
  url: "authorization.php",
  data: [],
  success: function (result) {
    //console.log(result); // funcionou
    criarBraintree(result);
  },
  error: function (error) {
    alert(error);
  },
});

function criarBraintree(token) {
  braintree.dropin.create(
    {
      authorization: token,
      container: "#dropin-container",
    },
    (error, dropinInstance) => {
      if (error) console.error(error);
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        dropinInstance.requestPaymentMethod((error, payload) => {
          if (error) console.error(error);
          // Step four: when the user is ready to complete their
          //   transaction, use the dropinInstance to get a payment
          //   method nonce for the user's selected payment method, then add
          //   it a the hidden field before submitting the complete form to
          //   a server-side integration
          document.getElementById("nonce").value = payload.nonce;
          form.submit();
        });
      });
    }
  );
}
