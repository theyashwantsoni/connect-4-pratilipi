const router = require( 'express' ).Router();
const gameModel = require('../models/game');
const helpers = require('../utils/helpers');
const strings = require('../utils/constants');

var sessions = new Object();


router.get( '/', (request, response) => {
    let body = {
        'lost somewhere??': 'The game is one!!',
        'wanna start??': 'Enter <baseurl>/start'
    }
    helpers.apiResponse(response, 200, body, 'hello hacker!!!');
}); 

//routes without database connectivity
router.get( '/start', (request, response) => {
    let session_id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    sessions[session_id] = helpers.initInstance();
    sessions[session_id].id = session_id;
    sessions[session_id].current_move = sessions[session_id].first_move;
    helpers.apiResponse(response, 201, sessions[session_id], strings.new_game);
});

router.get( '/move/:session/:col', ( request, response ) => {
    let session = request.params.session,
    col = parseInt(request.params.col);
    if(session && col && col <=7 && col >=1){
        if(sessions[session]){
            let   instance = sessions[session],
            current_move = helpers.checkCurrentMove(instance.moves);
            instance.current_move =current_move;
            helpers.updateBoard(instance, col, current_move).then(data =>{
                if(data == null){
                    helpers.apiResponse(response, 406, instance, strings.column_full)
                }else{
                    helpers.apiResponse(response, 200, data, strings.update_board)
                }
            });
        }else{
            helpers.apiResponse(response, 400, null, strings.int_not_found);
        }
    }else{
        helpers.apiResponse(response, 400, null, strings.bad_rqst)
    }
});

//routes with database connectivity
router.get( '/db/start', (request, response) => {
    var temp = helpers.initInstance();
    gameModel.create(temp, function (err, result) {
        if (err){
            console.log(err);
            helpers.apiResponse(response, 500, null, strings.create_err);
        }else{
            helpers.apiResponse(response, 201, result, strings.new_game);
        }
    });
});
router.get( '/db/move/:session/:col', ( request, response ) => {

    let session = request.params.session,
    col = parseInt(request.params.col);

    if(session && col && col <=7 && col >=1){
        gameModel.findById(session, function(err, result){
			if (err) {
                helpers.apiResponse(response, 500, null, strings.fetch_err)
            } else {
                if(result){
                    let   instance = result,
                    current_move   = helpers.checkCurrentMove(instance.moves);
                    instance.current_move = current_move;
                    helpers.updateBoard(instance, col, current_move).then(data =>{
                        if(data == null){
                            helpers.apiResponse(response, 406, instance, strings.column_full)
                        }else{
                            gameModel.findByIdAndUpdate(session, data, function(err, result_updated){
                                if(err)
                                    helpers.apiResponse(response, 500, instance, strings.update_err)
                                else {
                                    helpers.apiResponse(response, 200, data, strings.update_board)
                                }
                            });
                        }
                    });
                }else{
                    helpers.apiResponse(response, 400, null, strings.int_not_found)
                }
            }
		});
    }else{
        helpers.apiResponse(response, 400, null, strings.bad_rqst)
    }
});


//api to delete all the activities
router.delete( '/clear', (request, response) => {
    Object.getOwnPropertyNames(sessions).forEach(function (prop) {
        delete sessions[prop];
    });
    gameModel.deleteMany({}, function(err, result){
        if(err){
            helpers.apiResponse(response, 500, null, strings.del_err)
        }else{
            helpers.apiResponse(response, 204, null, strings.del_succ)
        }
    })
});



module.exports = router;

