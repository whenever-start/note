class Gobang {
  constructor(target, options) {
    this.target = target
    // todo
    this.options = options

    this.blacks = [] // 所有已下的黑子
    this.whites = [] // 所有已下的白子
    this.whiteTurn = true // 是否白子先手
    this.grids = [] // 所有格子
    this.last = null
    this.isFinished = false
  }

  // 生成棋盘
  initGame() {
    for (let x = 0; x < 15; x++) {
      this.grids[x] = []
      for (let y = 0; y < 15; y++) {
        const grid = document.createElement('div')
        grid.className = 'grid'
        grid.dataset.x = x
        grid.dataset.y = y
        grid.addEventListener('click', this.putChess.bind(this, grid))

        this.target.appendChild(grid)
        this.grids[x].push(grid)
      }
    }
  }

  /** ******事件 ****** */
  // 放置棋子
  putChess(grid) {
    if (
      this.hasClass(grid, 'white') ||
      this.hasClass(grid, 'black') ||
      this.isFinished
    ) {
      return
    }

    if (this.whiteTurn) {
      grid.classList.add('white')
      this.whites.push(grid)
    } else {
      grid.classList.add('black')
      this.blacks.push(grid)
    }

    // win
    if (this.isWin(grid)) {
      this.isFinished = true
      const fn = this.whiteTurn ? this.succeed : this.loss
      fn()
      return
    }

    // last
    if (this.last) {
      this.last.classList.remove('last')
    }
    grid.classList.add('last')
    this.last = grid

    this.whiteTurn = !this.whiteTurn
  }

  // 判断是否赢
  isWin(grid) {
    const x = parseInt(grid.dataset.x)
    const y = parseInt(grid.dataset.y)

    return this.isXMatched(x, y) ||
      this.isYMatched(x, y) ||
      this.isSlantUp(x, y) ||
      this.isSlantDown(x, y)
      ? true
      : false
  }

  // 重置游戏
  reStart() {
    this.blacks.forEach((grid) => grid.classList.remove('black'))
    this.whites.forEach((grid) => grid.classList.remove('white'))
    this.last.classList.remove('last')
    this.last = null
    this.blacks = []
    this.whites = []
    this.whiteTurn = true
    this.isFinished = false
  }

  finish(succeed, loss) {
    this.succeed = succeed
    this.loss = loss
  }

  /** ***************** 工具 分割线 ***************** */
  getMatchCount(x, y, xRule, yRule) {
    let newX = x
    let newY = y
    let className = this.grids[x][y].className
    while (
      newX >= 0 &&
      newY >= 0 &&
      newX < 15 &&
      newY < 15 &&
      this.grids[newX][newY].className === className
    ) {
      newX = xRule(newX)
      newY = yRule(newY)
    }
    return Math.max(Math.abs(newY - y) - 1, Math.abs(newX - x) - 1)
  }

  // x轴
  isXMatched(x, y) {
    let xr = this.getMatchCount(
      x,
      y,
      (x) => x,
      (y) => y + 1
    )
    let xl = this.getMatchCount(
      x,
      y,
      (x) => x,
      (y) => y - 1
    )
    return xl + xr === 4 ? true : false
  }

  // y轴
  isYMatched(x, y) {
    let yUp = this.getMatchCount(
      x,
      y,
      (x) => x - 1,
      (y) => y
    )
    let yDown = this.getMatchCount(
      x,
      y,
      (x) => x + 1,
      (y) => y
    )
    return yUp + yDown === 4 ? true : false
  }

  // 斜向上
  isSlantUp(x, y) {
    let up = this.getMatchCount(
      x,
      y,
      (x) => x - 1,
      (y) => y + 1
    )
    let down = this.getMatchCount(
      x,
      y,
      (x) => x + 1,
      (y) => y - 1
    )
    return up + down === 4 ? true : false
  }

  // 斜向下
  isSlantDown(x, y) {
    let up = this.getMatchCount(
      x,
      y,
      (x) => x - 1,
      (y) => y - 1
    )
    let down = this.getMatchCount(
      x,
      y,
      (x) => x + 1,
      (y) => y + 1
    )
    return up + down === 4 ? true : false
  }

  hasClass(element, className) {
    return element.className.indexOf(className) !== -1
  }
}
