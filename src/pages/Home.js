import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ContentBox from "../components/UI/ContentBox";
import Table from "../components/UI/Table";
import useHttp from "../hooks/use-http";

const Home = () => {
    const { isLoading, sendRequest } = useHttp();
    const [data, setData] = useState([]);
    const [info, setInfo] = useState(null);
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

    useEffect(() => {
        sendRequest({
            url: `https://localhost:5001/settings/info`,
            headers: { 'Content-Type': 'application/json' }
        }, (data) => {
            setInfo(data);
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
                            if (filterValue.length == 0) return rows;
                            return rows.filter((row) => filterValue.includes(row.values.date.getFullYear()));
                        }
                    },
                    {
                        Header: 'Název',
                        accessor: 'name',
                        Cell: (props) => {
                            return <a className="public-race-link" href={"\\zavod\\" + props.cell.row.original.ID}>{props.value}</a>
                        }
                    },
                    {
                        Header: 'Oddíl',
                        accessor: 'organizer',
                    },
                    {
                        Header: ' ',
                        accessor: 'oris',
                        Cell: (props) => {
                            if(!props.value) return null;
                            return (<a href={`https://oris.orientacnisporty.cz/Zavod?id=${props.value}`} title="Zobrazit závod v ORISu" target="_blank">
                                <img src="/oris.jpg" />
                                </a>);
                        }
                    },
                ],
            }
        ],
        []
    )

    const GetInfo = () => {
        if(info && info.info){
            return info.info;
        }
        return null;
    }

    return (
        <div className="container">
            <div className="d-flex flex-md-row flex-column-reverse d-flex justify-content-center m" >
                <ContentBox sx={{ width: '100%', ml: 3 }}>
                    <Table columns={columns} data={data} yearFiltering searching initialState={{ sortBy: [{ id: 'date', desc: true }], pageSize: 10 }} />
                </ContentBox>
                <ContentBox sx={{ width: '100%', ml: 3 }}>
                    <div className="ml-3 d-flex flex-column align-items-center justify-content-center" dangerouslySetInnerHTML={{__html: GetInfo()}}>
                    </div>
                </ContentBox>
            </div>
        </div>
    );
};

export default Home;