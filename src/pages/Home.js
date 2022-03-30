import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../components/UI/Table";
import useHttp from "../hooks/use-http";

const Home = () => {
    const { isLoading, error, sendRequest } = useHttp();
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        sendRequest({ url: `https://localhost:5001/race/all-public` }, (data) => {
            setData(data.races.map((item) => {
                return ({
                    ID: item.key,
                    date: new Date(item.date),
                    name: item.name,
                    organizer: item.organizer,
                    oris: item.orisId
                });
            }));
        });
    }, []);    

    const columns = useMemo(
        () => [
            {
                Header: ' ',
                columns: [
                    {
                        Header: 'Datum',
                        accessor: 'date',
                        Cell: ({ cell: { value } }) => value.toLocaleDateString("cs-CZ"),
                        sortType: "datetime",
                        filter: (rows, id, filterValue) => {
                            if(filterValue.length == 0) return rows;
                            return rows.filter((row) => filterValue.includes(row.values.date.getFullYear()));
                        }
                    },
                    {
                        Header: 'Název',
                        accessor: 'name',
                        Cell: (props) => {
                            return <a href={"\\zavod\\"+ props.cell.row.original.ID}>{props.value}</a>
                        }
                    },
                    {
                        Header: 'Oddíl',
                        accessor: 'organizer',
                    },
                ],
            }
        ],
        []
    )

    return (
        <div className="d-flex flex-md-row flex-column-reverse" >
            <div className="mx-1" style={{ width: '100%', background: 'rgba(255,255,255,0.6)', border: '1px solid'}}>
                <Table name="Veřejné závody" columns={columns} data={data} yearFiltering searching initialState={{sortBy:[{id: 'date', desc: true}], pageSize: 10}} />
            </div>
            <div className="mx-1" style={{ height: '300px', width: '100%' }}></div>
        </div>
    );
};

export default Home;