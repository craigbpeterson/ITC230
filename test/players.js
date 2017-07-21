'use strict';

const expect = require("chai").expect;
const players = require("../lib/players.js");

describe("Players", function() {

    it("returns requested player", function() {
        let result = players.get('2');
        expect(result).to.deep.equal({ number:'2', name:'Clint Dempsey', position:'Forward', goals:'7', hometown:'Nacogdoches, TX' });
    });

    it("fails to return a result for invalid player", function() {
        let result = players.get("fake");
        expect(result).to.be.undefined;
    });

    it("adds a new player", function() {
        const originalTotalPlayers = players.getAll().length;
        players.add({ number:'1', name:'Craig Peterson', position:'Developer', goals:'0', hometown:'Seattle, WA' });
        let newTotalPlayers = players.getAll().length;
        expect(newTotalPlayers > originalTotalPlayers).to.be.true;
    });
    
    it("fails to add an existing player", function() {
        const originalTotalPlayers = players.getAll().length;
        players.add({ number:'2', name:'Clint Dempsey', position:'Forward', goals:'7', hometown:'Nacogdoches, TX' });
        let newTotalPlayers = players.getAll().length;
        expect(newTotalPlayers === originalTotalPlayers).to.be.true;
    });

    it("deletes an existing player", function() {
        const originalTotalPlayers = players.getAll().length;
        players.delete('2');
        let newTotalPlayers = players.getAll().length;
        expect(newTotalPlayers < originalTotalPlayers).to.be.true;
    });

    it("fails to delete an invalid player", function() {
        const originalTotalPlayers = players.getAll().length;
        players.delete('0');
        let newTotalPlayers = players.getAll().length;
        expect(newTotalPlayers === originalTotalPlayers).to.be.true;
    });

});