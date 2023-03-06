/****************************************************************************
  FileName      [ reveal.js ]
  PackageName   [ src/util ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file states the reaction when left clicking a cell. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

export const revealed = (board, x, y, newNonMinesCount) => {


    // Advanced TODO: reveal cells in a more intellectual way.
    // Useful Hint: If the cell is already revealed, do nothing.
    //              If the value of the cell is not 0, only show the cell value.
    //              If the value of the cell is 0, we should try to find the value of adjacent cells until the value we found is not 0.
    //              The input variables 'newNonMinesCount' and 'board' may be changed in this function.

    let detectList = new Set()
    detectList.add([x, y])


    while (detectList.size !== 0) {

      for(let i of detectList) {
        let x_new = i[0]
        let y_new = i[1]

        try{ if ((board[x_new][y_new].value !== 0) && (!board[x_new][y_new].flagged) && (!board[x_new][y_new].revealed)) {
          board[x_new][y_new].revealed = true 
          newNonMinesCount-- ;

        } } catch(e){}

        try{ if ((board[x_new][y_new].value === 0) && (!board[x_new][y_new].flagged) && (!board[x_new][y_new].revealed)) {
          board[x_new][y_new].revealed = true 
          newNonMinesCount-- ;

          detectList.add([x_new+1, y_new])
          detectList.add([x_new-1, y_new])
          detectList.add([x_new  , y_new+1])
          detectList.add([x_new  , y_new-1])

          detectList.add([x_new+1, y_new+1])
          detectList.add([x_new-1, y_new-1])
          detectList.add([x_new+1, y_new-1])
          detectList.add([x_new-1, y_new+1])

        } } catch(e){}

        detectList.delete(i)

      }
      
    }

  return { board, newNonMinesCount };
};