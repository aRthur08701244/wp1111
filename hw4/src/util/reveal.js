/****************************************************************************
  FileName      [ reveal.js ]
  PackageName   [ src/util ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file states the reaction when left clicking a cell. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

export const revealed = (board, x, y, newNonMinesCount) => {
    board[x][y].revealed = true;
    newNonMinesCount-- ;
    console.log(newNonMinesCount)

    // Advanced TODO: reveal cells in a more intellectual way.
    // Useful Hint: If the cell is already revealed, do nothing.
    //              If the value of the cell is not 0, only show the cell value.
    //              If the value of the cell is 0, we should try to find the value of adjacent cells until the value we found is not 0.
    //              The input variables 'newNonMinesCount' and 'board' may be changed in this function.
    if (board[x][y].value == 0){

      try{ if ((board[x+1][y].value == 0) && (!board[x+1][y].flagged) && (!board[x+1][y].revealed)) {
        board[x+1][y].revealed = true 
        newNonMinesCount-- ;
        console.log('1', newNonMinesCount)
      } } catch(e){}

      try{ if ((board[x-1][y].value == 0) && (!board[x-1][y].flagged) && (!board[x-1][y].revealed)) {
        board[x-1][y].revealed = true
        newNonMinesCount-- ;
        console.log('2', newNonMinesCount)
      } } catch(e){}

      try{ if ((board[x][y+1].value == 0) && (!board[x][y+1].flagged) && (!board[x][y+1].revealed)) {
        board[x][y+1].revealed = true
        newNonMinesCount-- ;
        console.log('3', newNonMinesCount)
      } } catch(e){}

      try{ if ((board[x][y-1].value == 0) && (!board[x][y-1].flagged) && (!board[x][y-1].revealed)) {
        board[x][y-1].revealed = true
        newNonMinesCount-- ;
        console.log('4', newNonMinesCount)
      } } catch(e){}

      //////////

      try{ if ((board[x+1][y+1].value == 0) && (!board[x+1][y].flagged) && (!board[x+1][y+1].revealed)) {
        board[x+1][y+1].revealed = true 
        newNonMinesCount-- ;
        console.log('5', newNonMinesCount)
      } } catch(e){}

      try{ if ((board[x-1][y-1].value == 0) && (!board[x-1][y].flagged) && (!board[x-1][y-1].revealed)) {
        board[x-1][y-1].revealed = true
        newNonMinesCount-- ;
        console.log('6', newNonMinesCount)
      } } catch(e){}

      try{ if ((board[x-1][y+1].value == 0) && (!board[x][y+1].flagged) && (!board[x-1][y+1].revealed)) {
        board[x-1][y+1].revealed = true
        newNonMinesCount-- ;
        console.log('7', newNonMinesCount)
      } } catch(e){}

      try{ if ((board[x+1][y-1].value == 0) && (!board[x][y-1].flagged) && (!board[x+1][y-1].revealed)) {
        board[x+1][y-1].revealed = true
        newNonMinesCount-- ;
        console.log('8', newNonMinesCount)
      } } catch(e){}
      
    }

    return { board, newNonMinesCount };
};
