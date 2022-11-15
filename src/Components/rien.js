import React fromreact'
import ReactDOM from
'react-dom':
const Hello = ({ name, bar, val }) => (
<diva
{name ? <span>Hello {name}</spans : null}
{bar && <span>
f0o = {bar}
</span>}
{val && <span>
val = {val} </span>}
</diva
)
const data = {
bar: 4,
val: null
1:
ReactDOM. render(
≤Hello name="World"{...data}/>,
document.getElementById('container')