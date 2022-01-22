# DB Info
user = "postgres"
password = "admin"
host = "localhost"
port = "5432"
database = "EducationDB"
queryString = f"""select s.state_id id, 
    y.year, 
	s.state,
	p.poverty_percentage,
	p.med_income,
	t.total_revenue,
	ps.total_instructional_spending,
	ps.percent_spending_of_revenue,
	t.total_expenditure_per_student,
	g.grade,
	sbj.subject,
	a.avg_score
from poverty_income p
	join total_revenue t on (p.year_id = t.year_id and p.state_id = t.state_id)
	join average_score a on (p.year_id = a.year_id and p.state_id = a.state_id)
	join percent_spending ps on (p.year_id = ps.year_id and p.state_id = ps.state_id)
	join subject sbj on (a.subject_id = sbj.subject_id)
	join grade g on (g.grade_id = a.grade_id)
	join state s on (p.state_id = s.state_id)
	join year y on (p.year_id = y.year_id)
order by s.state, sbj.subject, y.year_id
;"""
