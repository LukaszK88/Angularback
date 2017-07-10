
module myApp{

    'use-strict';

    export class EventCtrl {
            static $inject =[
                '$http',
                '$scope',
                '$location',
                'BlogResource',
                '$stateParams',
                'MediaResource',
                'toastService',
                '$state',
                '_',
                'EventResource',
                'FighterResource'
            ];


            tournaments:any = [];
            currentState:string;
            eventAttendId:number;
            tournament:any = [];
            attendingCount:number;
            attendees:any = [];
            categories:any = [];


        constructor(public $http:ng.IHttpService,
                        public $scope:ng.IScope,
                        public $location:any,
                        protected BlogResource:any,
                        protected $stateParams:any,
                    protected media:any,
                    protected Toast:any,
                    protected $state:any,
                    protected _:any,
                    protected event:any,
                    protected FighterResource:any
        ){

            this.currentState =  $state.current.name;

            if(this.currentState === 'tournaments'){
                this.fetchTournaments();
            }
            if(this.currentState === 'tournament'){
                this.fetchTournament();
                this.fetchAttendees();
            }

        }
        public fetchAttendees(){

            this.event.attendees({eventId:this.$stateParams['tournamentId']}).$promise.then((response) => {
                this.attendees = response;
               // console.log(this.attendees);
            });
        }

        public fetchTournament(){
            console.log(this.$stateParams['tournamentId']);
            this.event.get({eventId:this.$stateParams['tournamentId']}).$promise.then((response) => {
                console.log(response);
                this.tournament = response;
                this.attendingCount = response.attendance.length;
            });
        }

        public submitAttendanceCategories(categories){
            this.event.attendCategories({eventAttendId:this.$stateParams['eventAttendId']}, categories).$promise.then((response) => {

            });
        }

        public attend(user, event) {
            let status:any ={};

            this.categories.event = event.category;
             status['going'] = true;
            this.event.attend({eventId: event.id, userId: user.id}, status).$promise.then((response) => {
                this.FighterResource.getFighterEventInfo({eventAttendId:response.id,userId:user.id}).$promise.then((data) => {

                    let array:any = {};
                    angular.forEach(data.event_attend_category, function(value, key) {
                        array[value.name] = true;
                    });
                    this.categories.user = array;
                });
                this.Toast.makeToast('success','You are going to ' + event.title);
                this.$state.go('tournaments',{eventAttendId:response.id});
            });
        }
        public cantGo(user, event){
            let status:any ={};
            status['going'] = false;
            this.event.attend({eventId: event.id, userId: user.id}, status).$promise.then((response) => {
                this.Toast.makeToast('error','You are not going to ' + event.title);
            });
        }

        protected fetchTournaments(){
            this.event.getByType({typeId:1}).$promise.then((response)=>{
                this.tournaments = response;
                let now = new Date().getTime();
                this._.forEach(this.tournaments,((value, key) => {
                  //  let countdown = (new Date(value.date).getTime()) - now;
                        //value.date = Math.floor((countdown % (1000 * 60)) / 1000);
                    value.date = ((new Date(value.date).getTime() - now) / 1000);
                }));

            });
        }
    }
    angular.module('myApp').controller('myApp.EventCtrl', EventCtrl);
}



