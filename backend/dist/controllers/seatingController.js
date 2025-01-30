"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSeatingArrangement = void 0;
const Student_1 = __importDefault(require("../models/Student"));
const Room_1 = __importDefault(require("../models/Room"));
const generateSeatingArrangement = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield Student_1.default.findAll();
        const rooms = yield Room_1.default.findAll();
        if (!students.length || !rooms.length) {
            res.status(404).json({ success: false, message: 'No students or rooms available' });
            return;
        }
        const arrangement = students.map((student, index) => ({
            student,
            room: rooms[index % rooms.length],
        }));
        res.status(200).json({ success: true, arrangement });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.generateSeatingArrangement = generateSeatingArrangement;
