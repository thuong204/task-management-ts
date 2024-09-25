"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.changeMulti = exports.changeStatus = exports.detail = exports.index = void 0;
const pagination = __importStar(require("../../../helpers/pagination"));
const task_model_1 = __importDefault(require("../models/task.model"));
const search_1 = __importDefault(require("../../../helpers/search"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const find = { deleted: false };
    if (req.query.status) {
        find.status = req.query.status.toString();
    }
    const objectSort = {};
    if (req.query.sortKey && req.query.sortValue) {
        objectSort[`${req.query.sortKey}`] = req.query.sortValue;
    }
    const initPagination = {
        currentPage: 1,
        limitItems: 5
    };
    const countTasks = yield task_model_1.default.countDocuments(find);
    const objectPagination = pagination.pagination(initPagination, req.query, countTasks);
    const objectSearch = (0, search_1.default)(req.query);
    if (req.query.keyword) {
        find.title = objectSearch.regex;
    }
    const task = yield task_model_1.default.find(find).sort(objectSort).limit(objectPagination.limitItems).skip(objectPagination.skip);
    res.json(task);
});
exports.index = index;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const task = yield task_model_1.default.findOne({
            _id: id,
            deleted: false
        });
        res.json(task);
    }
    catch (error) {
        res.json("Khoog tim thay");
    }
});
exports.detail = detail;
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const status = req.body.status;
        yield task_model_1.default.updateOne({
            _id: id
        }, {
            status: status
        });
        res.json({
            code: 200,
            message: "Cập nhật trạng thái thanhff công"
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Không tồn tại"
        });
    }
});
exports.changeStatus = changeStatus;
const changeMulti = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ids, key, value } = req.body;
        switch (key) {
            case "status":
                yield task_model_1.default.updateMany({
                    _id: { $in: ids }
                }, {
                    status: value
                });
                res.json({
                    code: 200,
                    message: "Cập nhật trạng thái thanhff công"
                });
                break;
            case "delete":
                yield task_model_1.default.deleteMany({
                    _id: { $in: ids }
                });
                res.json({
                    code: 200,
                    message: "Xóa nhiều công viêc thành công"
                });
                break;
            default:
                res.json({
                    code: 400,
                    message: "Không tồn tại"
                });
                break;
        }
    }
    catch (error) {
    }
});
exports.changeMulti = changeMulti;
