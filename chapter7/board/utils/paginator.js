const lodash = require("lodash");
const PAGE_LIST_SIZE = 10;

//총 개수, 페이지, 한 페이지에 ㅛㅍ시하는 게시물 개수를 매개변수로 받음
module.exports = ({totalCount, page, perPage}) => {
    const PER_PAGE = perPage;
    const totalPage = Math.ceil(totalCount / PER_PAGE);

    //시작페이지 : 몫 * PAGE_LIST_SIZE + 1
    let quotient = parseInt(page / PAGE_LIST_SIZE);
    if (page % PAGE_LIST_SIZE === 0) {
        quotient -= 1;
    }
    const startPage = quotient * PAGE_LIST_SIZE + 1;

    //끝 페이지
}