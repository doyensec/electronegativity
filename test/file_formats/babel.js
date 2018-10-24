// Error: Unexpected token =
class FooClass extends React.Component {
    static propTypes = {
      title: PropTypes.string.isRequired,
    };
}
  
//Error: Missing initializer in const declaration
const f: Function = v => v + 1 // flow
  
// Error: Unexpected token *
module.exports = async function* hello() {}
