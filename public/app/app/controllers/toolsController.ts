
module myApp{

   export class ToolsCtrl{

        static $inject=[
                '$scope',
                'toastService'
        ];

        pass:boolean = null;
        idealBalance:number;
        idealWeight:number;
        constructor(public $scope:ng.IScope,
                    public Toast:any
        ){

            $scope.$watch('tools.weapon',(newVal,oldVal) => {
                let check:number;
                if(newVal) {
                    check = this.wmfcWeaponCheck(newVal.balance, newVal.weight);
                    this.idealBalance = ((25.5 / newVal.weight) - 5 );
                    this.idealWeight = (25.5 / (newVal.balance + 5));
                    if(this.idealWeight <= 1.4){
                        this.idealWeight = 1.4;
                    }
                    if (check < 25.5) {
                        this.pass = false;
                    } else if (check >= 25.5) {
                        this.pass = true;
                    }
                }
            },true);
        }

        private wmfcWeaponCheck(balance:number, weaponWeight:number){
            return ((balance + 5) * weaponWeight);
        }


    }
    
  angular.module('myApp').controller('myApp.ToolsCtrl',ToolsCtrl);

}









   