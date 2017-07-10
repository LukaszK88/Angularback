
module myApp{

   export class SignupCtrl implements ISignupCtrl {

        static $inject=[
                '$scope',
                '$location',
                '$auth',
                'toastService',
            '$timeout',
            '$window'
        ];

        constructor(public $scope:ng.IScope,
                    public $location:any,
                    public $auth:any,
                    public Toast:any,
                    public $timeout:any,
                    protected $window:any
                    ){


                    }

            public signup(user){
                    this.$auth.signup(user)
                .then((response) => {
                    //this.$auth.setToken(response.data.token);
                    //this.$auth.login(user);
                    this.$timeout(() => {
                        this.$location.path('/');
                        this.$window.location.reload();
                    },3000);
                    this.Toast.makeToast('success', response.data.message);
                })
                .catch((response) => {

                    this.Toast.makeToast('error', response.data.error.email[0]);
                    
                });
             } 
    }
    
  angular.module('myApp').controller('myApp.SignupCtrl',SignupCtrl);

}









   