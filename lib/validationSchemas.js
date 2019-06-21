module.exports = {
	"scatter_plot": {
		"type": "object",
		"properties": {
		"x": { "type": "string" },
		"y": { "type": "string" },
		"title": { "type": "string" },
		"data": {
			"type": "array",
			"items": {
				"type": "object",
				"properties": {
					"x": {"type": "number"},
					"y": {"type": "number"}
				}
			}
		}
	  }
	}
}