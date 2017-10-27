

var Exchange = React.createClass({
        render: function(){
            var currencyOptions = this.props.currencies.map(function(currency){
                return(
                    <option>{currency}</option>
                )
            });
        }
    });