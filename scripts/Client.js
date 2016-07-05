class Client {
    constructor() {
        this.socket = io();
        this.socket.on('connected', function(msg) {
            console.log(msg);
        });

        this.socket.on('position', function(data) {
            console.log('X= '+data.x);
            console.log('Y= '+data.y);
            console.log(data.x*TankOnline.game.world.width+'+'+data.y*TankOnline.game.world.height);
            TankOnline.initialize(data.x*TankOnline.game.world.width,data.y*TankOnline.game.world.height);
        });
    }
}
