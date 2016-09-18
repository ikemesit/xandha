(function(){
  'use strict';

  angular
    .module('xandha')
    .controller('LoginController', LoginController);


  function LoginController($log, $timeout, $state, $firebaseAuth, toastr, authService){
    var vm = this;
      vm.newUser = {
        name: null,
        email: null,
        password: null,
        confirmPassword: null
      };

      vm.existingUser = {
		email: null,
		password: null
      };

      // DOM Manipulation Switches
      vm.required = true;
      vm.emailSuccess = true;
      vm.emailError = false;
      vm.valueSuccess = true;
      vm.valueError = false;
      vm.passwordMatchSuccess = true;
      vm.passwordMatchError = false;
      vm.authActive = false;

      // Validation
      vm.validateEmailInput = validateEmailInput;
      vm.checkEmpty = checkEmpty;
      vm.validatePasswordMatch = validatePasswordMatch;


      // Form Context
      vm.context = "login";
      vm.switchContext = switchContext;

      // Submit Form content
      vm.submitForm = submitForm;

      // Sign In user
      vm.signInWithEmailAndPassword = signInWithEmailAndPassword;

    checkAuthState();


    function switchContext(){
      if(vm.context == "login")
        vm.context = "registration";
      else if(vm.context == "registration")
        vm.context = "login";
    }

    function validateEmailInput(value){
      if(validateEmail(value)){
        vm.emailError = false;
        vm.emailSuccess = false;
      }else{
        vm.emailSuccess = true;
        vm.emailError = true;
      }
    }

    function validateEmail(email){
      var pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern.test(email);
    }

    function checkEmpty(value){
      if(value !== null && value.length >= 2){
        vm.valueError = false;
        vm.valueSuccess = false;
      }else{
        vm.valueError = true;
        vm.valueSuccess = true;
      }
    }

    function validatePasswordMatch(value){
      if(value !== null && value === vm.newUser.password){
        vm.passwordMatchError = false;
        vm.passwordMatchSuccess = false;
      }else{
        vm.passwordMatchError = true;
        vm.passwordMatchSuccess = true;
      }
    }

    function submitForm(){
      vm.error = null;

      $timeout(function(){
        vm.authActive = true;
      },10);

      $timeout(function(){

        if(!validateEmail(vm.newUser.email))
          vm.error = "Please provide a valid email"

        var err;
        err = authService.createUser(vm.newUser.email, vm.newUser.password);

        // Respond to firebase errors
        if(err !== null){
          switch (err.code){
            case "auth/argument-error":
              vm.error = "Please provide valid details";
              break;
            case "auth/email-already-in-use":
              vm.error = "Email already in use";
              break;
            case "auth/invalid-email":
              vm.error = "Please provide a valid email";
              break;
            case "auth/weak-password":
              vm.error = "Please provide a stronger password";
              break;
          }
        }
        vm.authActive = false;

        authService.auth().$onAuthStateChanged(function(user){
    			if(user)
    				$state.go('user');
    		});
      }, 1000);

      $state.go('user');
    }
	
	function signInWithEmailAndPassword(){
		vm.signInError = null;
		
		$timeout(function(){
			vm.authActive = true;
		},10);

		$timeout(function(){
			var err = authService.signInWithEmailAndPassword(vm.existingUser.email, vm.existingUser.password);

			vm.authActive = false;

			if(err){
				vm.signInError = err.code;
			}
			else{
				authService.auth().$onAuthStateChanged(function(user){
					if(user)
						$state.go('destinations');
				});
			}
		}, 200);
    }

    function checkAuthState(){
		var user = null;
		user = authService.auth().$getAuth();
		if(user)
			$state.go('home');
    }

  }//end
})();
