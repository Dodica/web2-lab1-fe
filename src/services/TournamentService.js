import axios from 'axios';

const LOGIN_API_BASE_URL = 'http://localhost:8080/tournament';

class TournamentService {

    showTournamentsById(userid){
        return axios.get(LOGIN_API_BASE_URL + '/tournaments?userid=' +  userid);
    }

    showTournamentsByTournamentId(natjecanjeid){
        return axios.get(LOGIN_API_BASE_URL + '?natjecanjeid=' +  natjecanjeid);
    }

    createTournament(tournament) {
        return axios.post(LOGIN_API_BASE_URL + '/create', tournament);
    }

    editTournament(tournament){
        console.log(tournament);
        return axios.put(LOGIN_API_BASE_URL + '/edit', tournament);
    }
}

export default new TournamentService();