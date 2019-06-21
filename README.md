# Data_Visualization_API
Serverless API that turns json into data visualizations

## Scatter Plot

Route

```
/create/visual/scatter_plot
```

Method

```
POST
```

Post Body

```
{
	"x": "Years", 
	"y": "Value",
	"title": "Value increase by years",
	"data": [
		{"x": 1, "y": 3000},
		{"x": 2, "y": 3250},
		{"x": 3, "y": 5600},
		{"x": 4, "y": 7300},
		{"x": 5, "y": 8000}
	]
}
```
