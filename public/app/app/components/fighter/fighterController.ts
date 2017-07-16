module myApp{

    'use-strict';

    export class FighterCtrl {
            static $inject =[
                '$http',
                '$scope',
                '$location',
                'FighterResource',
                '$stateParams',
                'Upload',
                'AchievementResource',
                'toastService',
                'EventResource',
                '_',
                'uiCalendarConfig',
                '$compile',
                'config'
            ];


        achievements:any = [];
        events:any = [];
        eventAttendingCount:number;
        eventNotes:any = [];
        peopleAttending:number;
        eventSelect:any = [];
        photoUploaded:boolean = false;

        constructor(public $http:ng.IHttpService,
                    public $scope:ng.IScope,
                    public $location:any,
                    protected FighterResource:any,
                    protected $stateParams:any,
                    public Upload:any,
                    protected Achievement:any,
                    protected Toast:any,
                    protected EventResource:any,
                    protected _:any,
                    protected uiCalendarConfig:any,
                    protected $compile:any,
                    protected config:any
        ){
            this.fetchAchievements();
            this.getFighterEvents();
            this.getEvents();

            //UI calendar
            // /* Render Tooltip */
            // $scope.eventRender = ( event, element, view ) => {
            //     element.attr({'uib-tooltip-html': "\'<p>" + event.title + "</p>\'", 'tooltip-append-to-body': true});
            //     $compile(element)($scope);
            // };


//TODO in the future drop down only events which attended only by the user
            $scope.upload = (photo, name) => {
                if(photo) {
                    this.Upload.upload({
                        url: config.API + 'storePhoto/' + this.$scope.currentUser.id,
                        data: {
                            file: Upload.dataUrltoBlob(photo, name)
                        }
                    }).then((response: any) => {
                        this.photoUploaded = true;
                        this.$scope.fighter.image = response.data.imageUrl;
                        this.Toast.makeToast('success',response.data.message);

                    });
                }
            };

            if(this.$stateParams['fighterId']) {
                this.RankingResource.get({fighterId: this.$stateParams['fighterId']}).$promise
                    .then((response: any) => {
                        $scope.fighter = response;
                    });
            }
        }

        public getEvents(){
            this.EventResource.query().$promise.then((response:any) => {
                this.eventSelect = response;
            });
        }

        public getOtherAttendees(event){
            this.EventResource.attendees({eventId:event.id}).$promise
                .then((response:any) => {
                    event.users = response;
                    this.RankingResource.getFighterEventInfo({eventAttendId:event.eventAttendId,userId:this.$stateParams['fighterId']}).$promise
                        .then((response:any) => {
                            event.attending_categories = response.event_attend_category;
                        });
                });
        }

        public getFighterEvents(){
            this.EventResource.getAttendingEvents({userId:this.$stateParams['fighterId']}).$promise
                .then((response:any) => {
                   this.events = response;
                   this.eventAttendingCount = response.length;
                   //TODO change scope to AS
                   let calendarEvents:any = [];
                    let array:any = [];

                     this._.forEach(this.events, (value:any,key:any) => {
                        array.push({title:value['title'],start:value['date']})
                    });
                    this.$scope.eventSources = [array];
                });
        }

        public hideForm(){
            this.$scope.showform = false;
        }

        public fetchAchievements(){
            this.Achievement.get({userId:this.$stateParams['fighterId']}).$promise
                .then((response:any) => {
                    this.achievements = response.data;

                });
        }

        public updateAchievement(achievement){
            this.Achievement.update({userId: achievement.id}, achievement).$promise.then((response) => {
                this.fetchAchievements();
                this.Toast.makeToast('success', 'Achievement updated');
            });
        }


        public addAchievement(data){
            data.user_id = this.$scope.currentUser.id;
            this.Achievement.save(data).$promise.then((response) => {
                console.log(response.data);
                this.achievements.data.push(response.data);
                this.fetchAchievements();
                this.Toast.makeToast('success', response.message);
            });
        }

        public fighterLoggedIn(){
            if(this.$scope.currentUser) {
                if (this.$stateParams['fighterId'] == this.$scope.currentUser.id) {
                    return true;
                }
            }
        }

        public deleteAchievement(achievement:any){
            this.Achievement.deleteThis({userId:this.$stateParams['fighterId'], achievementId:achievement.id}).$promise
                .then((response:any) => {
                   let index=this.achievements.data.indexOf(achievement);
                    this.achievements.data.splice(index,1);
                    this.fetchAchievements();
                    this.Toast.makeToast('error',response.message);
                });
        }

      }

      angular.module('myApp').controller('myApp.FighterCtrl', FighterCtrl);
}



