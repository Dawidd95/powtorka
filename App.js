class App extends React.Component {
   state = {
      isConfirmed: false,
      isSubmit: false,
      amount: 0,
      available: 10,
      bought: 0
   }

   handleCheckboxChange = () => {
      this.setState( prevState => ({
         isConfirmed: !prevState.isConfirmed,
         isSubmit: false
      }))
   }

   displayMessage = () => {
      if(this.state.isSubmit) {
         if(!this.state.isConfirmed) {
            return <p style={{color: 'red', fontSize: '14px'}}>Musisz mieć ukończone 18 lat</p>
         }
      }
   }

   handleChangeAmountClick = (type) => {
      if(type === '+') {
         this.setState( prevState => ({
            amount: prevState.amount+1
         }))
      } else {
         this.setState( prevState => ({
            amount: prevState.amount-1
         })) 
      }
   }

   handleBuyTicketClick = () => {
      this.setState({
         isSubmit: true
      })

      if(this.state.isConfirmed) {
         this.setState( prevState => ({
            amount: 0,
            bought: prevState.bought+this.state.amount,
            available: prevState.available-this.state.amount
         }))
      }
    }

   render() { 
      return (  
         <div>
            <Header />
            <ConfirmAge
               isConfirmed={this.state.isConfirmed} 
               checkboxChange={this.handleCheckboxChange}
            />
            <ShoppingCart 
               amount={this.state.amount}
               available={this.state.available}
               bought={this.state.bought}
               changeAmountClick={this.handleChangeAmountClick}
               buyTicketClick={this.handleBuyTicketClick}
            />
            {this.displayMessage()}
         </div>
      );
   }
}

const Header = () => (
   <header className='app__header'>Kup bilet na najnowszy film marvela</header>
)

const ConfirmAge = ({isConfirmed, checkboxChange}) => (
   <div className='app__confirm'>
      <input type="checkbox" checked={isConfirmed} onChange={() => checkboxChange()}/>
      <p>Mam ukończone 18 lat</p>
   </div>
)

const ShoppingCart = ({amount, available, bought, changeAmountClick, buyTicketClick}) => (
   <div className='app__cart'>
      <ButtonRemove
         type='-'
         amount={amount}
         changeAmountClick={changeAmountClick}
      />
      <Amount 
         amount={amount}
      />
      <ButtonAdd
         type='+'
         amount={amount}
         available={available}
         changeAmountClick={changeAmountClick}
       />
      <ShoppingStatus 
         bought={bought}
         available={available}
      />
      <BuyButton
         amount={amount} 
         buyTicketClick={buyTicketClick}
      />
   </div>
)

const ButtonRemove = ({type, amount, changeAmountClick}) => (
   <button disabled={amount === 0 ? true : false} onClick={() => changeAmountClick(type)} className='cart__button'>          {type}
   </button>
)

const ButtonAdd = ({type, amount, available, changeAmountClick}) => (
   <button disabled={amount >= available ? true : false} onClick={() => changeAmountClick(type)} className='cart__button'> 
      {type} 
   </button>
)

const Amount = ({amount}) => (
   <p className='cart__amount'>{amount}</p>
)

const ShoppingStatus = ({bought, available}) => (
   <div className='cart__information'>
      <CartInformation 
         content='Ilość zakupionych biletów: '
         number={bought}
      />
      <CartInformation 
         content='Ilość dostępnych biletów: '
         number={available}
      />
   </div>
)

const CartInformation = ({content, number}) => (
   <p>{content} {number}</p>
)

const BuyButton = ({amount, buyTicketClick}) => (
   <button disabled={amount === 0 ? true : false} onClick={() => buyTicketClick()}>Zakup Bilet</button>
)

ReactDOM.render(<App />, document.getElementById('root'))
 