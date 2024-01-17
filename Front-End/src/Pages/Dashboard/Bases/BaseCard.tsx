import { Base, Missile } from "../../../types"
import { Missiles } from "./BaseDashboard"

interface BaseCardProps {
    base: Base,
    missiles: Missiles
}

function BaseCard(props: BaseCardProps) {
  return (
    <div key={props.base.name}>
        <h3>{props.base.name}</h3>
        <div>
        {props.missiles[props.base.name] && props.missiles[props.base.name].map((missile: Missile) => {
            console.log(missile);
            return (
                <div key={missile.name}>
                    <h4>{missile.name}</h4>
                    <p>{missile.productionCost}</p>
                    <p>{missile.launchCost}</p>
                    <p>{missile.blastRadius}</p>
                    <p>{missile.range}</p>
                </div>
            )
        })}
        </div>
    </div>
  )
}

export default BaseCard