import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './vehicle-type.reducer';
import { IVehicleType } from 'app/shared/model/vehicle-type.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVehicleTypeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class VehicleType extends React.Component<IVehicleTypeProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { vehicleTypeList, match } = this.props;
    return (
      <div>
        <h2 id="vehicle-type-heading">
          Vehicle Types
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Vehicle Type
          </Link>
        </h2>
        <div className="table-responsive">
          {vehicleTypeList && vehicleTypeList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Code</th>
                  <th>Name</th>
                  <th>Vehicle Type</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {vehicleTypeList.map((vehicleType, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${vehicleType.id}`} color="link" size="sm">
                        {vehicleType.id}
                      </Button>
                    </td>
                    <td>{vehicleType.code}</td>
                    <td>{vehicleType.name}</td>
                    <td>
                      {vehicleType.vehicleType ? (
                        <Link to={`vehicle-type/${vehicleType.vehicleType.id}`}>{vehicleType.vehicleType.id}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${vehicleType.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${vehicleType.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${vehicleType.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Vehicle Types found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ vehicleType }: IRootState) => ({
  vehicleTypeList: vehicleType.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VehicleType);
